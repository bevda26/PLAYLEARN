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
 * Creates a new quest document in the 'quest-modules' collection.
 * This function will be called by the auto-integration watcher or a manual admin tool.
 * @param questData - The data for the new quest module.
 */
export async function registerQuestModule(questData: Omit<QuestModule, 'createdAt'>) {
  // Ensure we don't pass the component itself to Firestore
  const { component, ...restOfQuestData } = questData as any;

  const questRef = doc(db, 'quest-modules', restOfQuestData.id);
  
  try {
    await setDoc(questRef, {
      ...restOfQuestData,
      createdAt: serverTimestamp(),
    });
    console.log(`Quest module ${restOfQuestData.id} registered successfully.`);
    return { success: true, docId: restOfQuestData.id };
  } catch (error) {
    console.error("Error registering quest module: ", error);
    throw error;
  }
}
