
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

// Titles awarded at each level
const LEVEL_TITLE_MAP: { [key: number]: string } = {
  2: 'Adventurer',
  5: 'Seasoned Explorer',
};

export async function completeQuest(userId: string, profile: UserProfile, quest: QuestModule): Promise<{ itemsAwarded: string[]; newTitle?: string } | void> {
  const progressRef = doc(db, 'user-progress', userId);
  const profileRef = doc(db, 'user-profiles', userId);
  
  let itemsAwarded: string[] = [];
  let newTitle: string | undefined;

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
        itemsAwarded = quest.metadata.itemRewards;
        newProgressData.inventory = arrayUnion(...itemsAwarded);
      }
      
      transaction.update(progressRef, newProgressData);

      // Check for a new title if the user leveled up
      if (newLevel > oldProgress.level) {
        const potentialNewTitle = LEVEL_TITLE_MAP[newLevel];
        if (potentialNewTitle && potentialNewTitle !== profile.title) {
          newTitle = potentialNewTitle;
          transaction.update(profileRef, { title: newTitle });
        }
      }
    });

    // After the transaction is successful, check for achievements
    // This is done outside the transaction to avoid contention
    await checkForNewAchievements(userId);

    return { itemsAwarded, newTitle };

  } catch (e) {
    console.error("Quest completion transaction failed: ", e);
    throw e; // Re-throw the error to be caught by the caller
  }
}
