// src/lib/quests.ts
'use server';

import { doc, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { QuestModule, UserProgress } from './types';

// XP needed to advance to the next level (level 1 -> 2 is at index 1)
const LEVEL_XP_MAP: { [key: number]: number } = {
  1: 100,
  2: 250,
  3: 500,
  4: 1000,
  5: 2000,
};

export async function completeQuest(userId: string, questId: string, xpGained: number) {
  const progressRef = doc(db, 'user-progress', userId);

  try {
    await runTransaction(db, async (transaction) => {
      const progressDoc = await transaction.get(progressRef);
      if (!progressDoc.exists()) {
        throw new Error("User progress document does not exist!");
      }

      const oldProgress = progressDoc.data() as Omit<UserProgress, 'userId'>;
      
      // Prevent completing the same quest twice
      if (oldProgress.questsCompleted[questId]) {
          console.log("Quest already completed.");
          return;
      }

      let newXp = oldProgress.xp + xpGained;
      let newLevel = oldProgress.level;
      let xpForNextLevel = LEVEL_XP_MAP[newLevel];

      // Handle leveling up
      while (xpForNextLevel && newXp >= xpForNextLevel) {
        newLevel++;
        newXp -= xpForNextLevel;
        xpForNextLevel = LEVEL_XP_MAP[newLevel];
      }

      const newProgress = {
        xp: newXp,
        level: newLevel,
        questsCompleted: {
          ...oldProgress.questsCompleted,
          [questId]: serverTimestamp(),
        },
      };

      transaction.update(progressRef, newProgress);
    });
  } catch (e) {
    console.error("Quest completion transaction failed: ", e);
    throw e; // Re-throw the error to be caught by the caller
  }
}

/**
 * Creates a new quest document in the 'quest-modules' collection.
 * @param questData - The data for the new quest module.
 */
export async function registerQuestModule(questData: QuestModule) {
  const questRef = doc(db, 'quest-modules', questData.id);
  
  try {
    await setDoc(questRef, {
      ...questData,
      createdAt: serverTimestamp(),
    });
    console.log(`Quest module ${questData.id} registered successfully.`);
  } catch (error) {
    console.error("Error registering quest module: ", error);
    throw error;
  }
}
