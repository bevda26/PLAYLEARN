// src/lib/quests.ts
'use server';

import { doc, getDoc, runTransaction, serverTimestamp, arrayUnion } from 'firebase/firestore';
import { db } from './firebase';
import type { QuestModule, UserProgress, UserProfile } from './types';
import { checkForNewAchievements } from './achievements';

// XP needed to advance to the next level (level 1 -> 2 is at index 1)
const LEVEL_XP_MAP: { [key: number]: number } = {
  1: 100,
  2: 250,
  3: 500,
  4: 1000,
  5: 2000,
};

export async function completeQuest(userId: string, quest: QuestModule) {
  const progressRef = doc(db, 'user-progress', userId);
  const profileRef = doc(db, 'user-profiles', userId);

  try {
    await runTransaction(db, async (transaction) => {
      const progressDoc = await transaction.get(progressRef);
      if (!progressDoc.exists()) {
        throw new Error("User progress document does not exist!");
      }

      const oldProgress = progressDoc.data() as Omit<UserProgress, 'userId'>;
      
      // Prevent completing the same quest twice
      if (oldProgress.questsCompleted[quest.id]) {
          console.log("Quest already completed.");
          return;
      }

      let newXp = oldProgress.xp + quest.metadata.xpReward;
      let newLevel = oldProgress.level;
      let xpForNextLevel = LEVEL_XP_MAP[newLevel];

      // Handle leveling up
      while (xpForNextLevel && newXp >= xpForNextLevel) {
        newLevel++;
        newXp -= xpForNextLevel;
        xpForNextLevel = LEVEL_XP_MAP[newLevel];
      }

      const newProgressData: any = {
        xp: newXp,
        level: newLevel,
        [`questsCompleted.${quest.id}`]: serverTimestamp(),
      };
      
      // Add item rewards to inventory if they exist
      if (quest.metadata.itemRewards && quest.metadata.itemRewards.length > 0) {
        newProgressData.inventory = arrayUnion(...quest.metadata.itemRewards);
      }

      transaction.update(progressRef, newProgressData);
    });

    // After the transaction is successful, check for achievements
    // This is done outside the transaction to avoid contention
    await checkForNewAchievements(userId);

  } catch (e) {
    console.error("Quest completion transaction failed: ", e);
    throw e; // Re-throw the error to be caught by the caller
  }
}
