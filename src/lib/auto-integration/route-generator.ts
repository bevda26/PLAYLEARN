// src/lib/auto-integration/route-generator.ts
'use server';
/**
 * @fileOverview Manages the integration of validated modules into the platform.
 * 
 * This service will be responsible for creating or updating the corresponding
 * quest document in the `quest-modules` collection in Firestore after a
 * module has been successfully validated.
 */

import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { QuestModule } from '@/lib/types';

/**
 * Creates or updates a quest document in the 'quest-modules' collection.
 * This function will be called by the auto-integration watcher or a manual admin tool.
 * @param questData - The complete data for the new quest module.
 */
export async function registerQuestModule(questData: Omit<QuestModule, 'createdAt'>) {
  // Ensure we don't pass the component reference itself to Firestore.
  // The 'component' property is for client-side use if ever needed, but shouldn't be in the DB.
  const { component, ...dataToSave } = questData as any;

  // The document ID should be the quest's ID.
  const questRef = doc(db, 'quest-modules', dataToSave.id);
  
  try {
    // Use setDoc with merge: true to create or update the document.
    // This saves all fields from the questData object.
    await setDoc(questRef, {
      ...dataToSave,
      createdAt: serverTimestamp(),
    }, { merge: true }); // Use merge to be safe, though set should work.
    
    console.log(`Quest module ${dataToSave.id} registered/updated successfully.`);
    return { success: true, docId: dataToSave.id };
  } catch (error) {
    console.error("Error registering quest module: ", error);
    throw error;
  }
}
