// src/lib/quests.ts
'use server';

import { doc, getDoc, runTransaction, serverTimestamp, arrayUnion, increment } from 'firebase/firestore';
import { db } from './firebase';
import type { QuestModule, UserProgress, UserProfile } from './types';
import { checkForNewAchievements } from './achievements';
import { getItemById } from './items';

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

// Each point of intellect grants a 2% XP bonus
const XP_BONUS_PER_INTELLECT = 0.02; 
// Each point of luck grants a 1% chance for an extra item drop
const EXTRA_ITEM_CHANCE_PER_LUCK = 0.01;

export async function completeQuest(userId: string, profile: UserProfile, quest: QuestModule): Promise<{ itemsAwarded: string[]; newTitle?: string, bonusXp?: number, bonusItems?: string[] } | void> {
  const progressRef = doc(db, 'user-progress', userId);
  const profileRef = doc(db, 'user-profiles', userId);
  
  let itemsAwarded: string[] = [];
  let bonusItems: string[] = [];
  let newTitle: string | undefined;

  // Calculate bonuses from attributes
  const intellectBonus = 1 + (profile.attributes.intellect * XP_BONUS_PER_INTELLECT);
  const finalXpReward = Math.round(quest.metadata.xpReward * intellectBonus);
  const bonusXp = finalXpReward - quest.metadata.xpReward;

  try {
    await runTransaction(db, async (transaction) => {
      const progressDoc = await transaction.get(progressRef);
      const profileDoc = await transaction.get(profileRef);

      if (!progressDoc.exists() || !profileDoc.exists()) {
        throw new Error("User progress or profile document does not exist!");
      }

      const oldProgress = progressDoc.data() as Omit<UserProgress, 'userId'>;
      
      let newXp = oldProgress.xp + finalXpReward;
      let newLevel = oldProgress.level;
      let xpForNextLevel = LEVEL_XP_MAP[newLevel];
      let skillPointsGained = 0;

      // Handle leveling up
      while (xpForNextLevel && newXp >= xpForNextLevel) {
        newLevel++;
        newXp -= xpForNextLevel;
        skillPointsGained++;
        xpForNextLevel = LEVEL_XP_MAP[newLevel];
      }

      const newProgressData: any = {
        xp: newXp,
        level: newLevel,
        [`questsCompleted.${quest.id}`]: arrayUnion(serverTimestamp()),
      };
      
      // New logic for trialProgress
      const { trialId, kingdomId, sagaId, id: questId } = quest;
      if (trialId && kingdomId && sagaId && questId) {
        const progressPath = `trialProgress.${trialId}.${kingdomId}.${sagaId}`;
        newProgressData[`${progressPath}.completedQuests`] = arrayUnion(questId);
        newProgressData[`${progressPath}.lastCompletedTimestamp`] = serverTimestamp();
      }
      
      itemsAwarded = quest.metadata.itemRewards || [];
      
      // Handle luck for bonus items
      const luckRoll = Math.random();
      const luckThreshold = profile.attributes.luck * EXTRA_ITEM_CHANCE_PER_LUCK;
      if (luckRoll < luckThreshold && itemsAwarded.length > 0) {
        // Award one of the existing reward items again as a bonus
        const randomBonusItem = itemsAwarded[Math.floor(Math.random() * itemsAwarded.length)];
        if (getItemById(randomBonusItem)) {
            bonusItems.push(randomBonusItem);
        }
      }
      
      const allItemsToAward = [...itemsAwarded, ...bonusItems];

      // Handle item rewards by incrementing their quantity
      if (allItemsToAward.length > 0) {
        for (const itemId of allItemsToAward) {
          newProgressData[`inventory.${itemId}`] = increment(1);
        }
      }
      
      transaction.update(progressRef, newProgressData);

      const newProfileData: any = {};

      // Check for a new title if the user leveled up
      if (newLevel > oldProgress.level) {
        const potentialNewTitle = LEVEL_TITLE_MAP[newLevel];
        if (potentialNewTitle && potentialNewTitle !== profile.title) {
          newTitle = potentialNewTitle;
          newProfileData.title = newTitle;
        }
      }

      if (skillPointsGained > 0) {
        newProfileData.skillPoints = increment(skillPointsGained);
      }
      
      if(Object.keys(newProfileData).length > 0) {
        transaction.update(profileRef, newProfileData);
      }
    });

    // We can enhance this later to check for saga/kingdom/trial completion achievements
    await checkForNewAchievements(userId);

    return { itemsAwarded, newTitle, bonusXp: bonusXp > 0 ? bonusXp : undefined, bonusItems: bonusItems.length > 0 ? bonusItems : undefined };

  } catch (e) {
    console.error("Quest completion transaction failed: ", e);
    throw e;
  }
}
