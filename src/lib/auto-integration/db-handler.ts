// src/lib/auto-integration/db-handler.ts
'use server';
import 'server-only';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { QuestModule } from '@/lib/types';

/**
 * Creates or updates a quest module document in Firestore.
 * @param questData The complete quest module data.
 */
export async function upsertQuestModule(questData: QuestModule) {
  try {
    const questRef = doc(db, 'quest-modules', questData.id);
    await setDoc(questRef, questData, { merge: true });
    console.log(`[DB Handler] Successfully upserted quest: ${questData.id}`);
  } catch (error) {
    console.error(`[DB Handler] Error upserting quest ${questData.id}:`, error);
    throw new Error('Failed to save quest module to database.');
  }
}
