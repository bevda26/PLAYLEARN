
// src/lib/skills.ts
'use server';

import { doc, runTransaction, increment } from 'firebase/firestore';
import { db } from './firebase';

type AttributeType = 'intellect' | 'luck';

/**
 * Spends a skill point to upgrade a specific attribute for a user.
 * This is a transactional operation to ensure data consistency.
 * @param userId - The ID of the user.
 * @param attribute - The attribute to upgrade ('intellect' or 'luck').
 */
export async function spendSkillPoint(userId: string, attribute: AttributeType): Promise<void> {
  const profileRef = doc(db, 'user-profiles', userId);

  try {
    await runTransaction(db, async (transaction) => {
      const profileDoc = await transaction.get(profileRef);

      if (!profileDoc.exists()) {
        throw new Error("User profile not found.");
      }

      const currentSkillPoints = profileDoc.data().skillPoints || 0;

      if (currentSkillPoints <= 0) {
        throw new Error("No skill points available to spend.");
      }

      // Decrement skill points and increment the chosen attribute
      transaction.update(profileRef, {
        skillPoints: increment(-1),
        [`attributes.${attribute}`]: increment(1),
      });
    });
  } catch (error) {
    console.error("Failed to spend skill point:", error);
    // Re-throw the error so it can be handled by the client
    throw error;
  }
}
