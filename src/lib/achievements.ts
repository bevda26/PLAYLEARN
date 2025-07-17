// src/lib/achievements.ts
'use server';

import { doc, updateDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Achievement, UserProgress, UserProfile } from './types';
import { ALL_ACHIEVEMENTS } from '@/lib/data/achievements';

// A map for quick lookups, created from the imported data array
const achievementMap = new Map(ALL_ACHIEVEMENTS.map(a => [a.id, a]));

/**
 * Checks a user's progress and profile to see if they've unlocked any new achievements.
 * If they have, it updates their profile.
 * @param userId The user's ID.
 */
export async function checkForNewAchievements(userId: string) {
    const profileRef = doc(db, 'user-profiles', userId);
    const progressRef = doc(db, 'user-progress', userId);

    const profileSnap = await getDoc(profileRef);
    const progressSnap = await getDoc(progressRef);

    if (!profileSnap.exists() || !progressSnap.exists()) {
        console.error("User profile or progress not found for achievement check.");
        return;
    }

    const profile = profileSnap.data() as UserProfile;
    const progress = progressSnap.data() as UserProgress;

    const newAchievements: { [key: string]: any } = {};

    // Rule 1: First quest completed
    if (!profile.unlockedAchievements.first_quest && Object.keys(progress.questsCompleted).length >= 1) {
        newAchievements['unlockedAchievements.first_quest'] = serverTimestamp();
        console.log(`User ${userId} unlocked: First Step`);
    }

    // Rule 2: Reached level 2
    if (!profile.unlockedAchievements.level_2 && progress.level >= 2) {
        newAchievements['unlockedAchievements.level_2'] = serverTimestamp();
        console.log(`User ${userId} unlocked: Level Up!`);
    }

    // Rule 3: Completed one math quest
    const mathQuestsCompleted = Object.keys(progress.questsCompleted).filter(id => id.startsWith('math-')).length;
    if (!profile.unlockedAchievements.math_novice && mathQuestsCompleted >= 1) {
        newAchievements['unlockedAchievements.math_novice'] = serverTimestamp();
        console.log(`User ${userId} unlocked: Math Novice`);
    }

    // If we have any new achievements, update the user's profile
    if (Object.keys(newAchievements).length > 0) {
        try {
            await updateDoc(profileRef, newAchievements);
        } catch (error) {
            console.error('Error awarding achievements:', error);
        }
    }
}

export async function getAchievementById(id: string): Promise<Achievement | undefined> {
    return achievementMap.get(id);
}
