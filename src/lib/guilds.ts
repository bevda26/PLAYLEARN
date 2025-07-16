
// src/lib/guilds.ts
'use server';

import { 
    doc,
    runTransaction,
    serverTimestamp,
    collection,
    writeBatch,
    arrayUnion,
    arrayRemove,
    increment
} from 'firebase/firestore';
import { db } from './firebase';
import type { Guild } from './types';

/**
 * Creates a new guild and adds the creator as the first member.
 * This is a transactional operation.
 * @param guildData - The initial data for the guild.
 */
export async function createGuild(guildData: Omit<Guild, 'id' | 'createdAt' | 'members' | 'memberCount'>): Promise<string> {
  const guildRef = doc(collection(db, 'guilds'));
  const userProfileRef = doc(db, 'user-profiles', guildData.leader);

  try {
    await runTransaction(db, async (transaction) => {
      const userProfileDoc = await transaction.get(userProfileRef);
      if (!userProfileDoc.exists()) {
        throw new Error('User profile not found.');
      }
      if (userProfileDoc.data().guildId) {
        throw new Error('User is already in a guild.');
      }

      // Create the guild
      transaction.set(guildRef, {
        ...guildData,
        members: [guildData.leader],
        memberCount: 1,
        createdAt: serverTimestamp(),
      });
      
      // Update the user's profile to include the new guild ID
      transaction.update(userProfileRef, { guildId: guildRef.id });
    });
    return guildRef.id;
  } catch (error) {
    console.error("Failed to create guild:", error);
    throw error;
  }
}

/**
 * Allows a user to join an existing guild.
 * @param guildId - The ID of the guild to join.
 * @param userId - The ID of the user joining.
 */
export async function joinGuild(guildId: string, userId: string): Promise<void> {
    const guildRef = doc(db, 'guilds', guildId);
    const userProfileRef = doc(db, 'user-profiles', userId);

    try {
        await runTransaction(db, async (transaction) => {
            const userProfileDoc = await transaction.get(userProfileRef);
            if (!userProfileDoc.exists()) throw new Error('User profile not found.');
            if (userProfileDoc.data().guildId) throw new Error('User is already in a guild.');
            
            const guildDoc = await transaction.get(guildRef);
            if (!guildDoc.exists()) throw new Error('Guild not found.');

            transaction.update(guildRef, { 
                members: arrayUnion(userId),
                memberCount: increment(1) 
            });
            transaction.update(userProfileRef, { guildId: guildId });
        });
    } catch (error) {
        console.error("Failed to join guild:", error);
        throw error;
    }
}

/**
 * Allows a user to leave their current guild.
 * @param guildId - The ID of the guild to leave.
 * @param userId - The ID of the user leaving.
 */
export async function leaveGuild(guildId: string, userId: string): Promise<void> {
    const guildRef = doc(db, 'guilds', guildId);
    const userProfileRef = doc(db, 'user-profiles', userId);
    
    try {
        await runTransaction(db, async (transaction) => {
            const guildDoc = await transaction.get(guildRef);
            if (!guildDoc.exists()) throw new Error('Guild not found.');
            
            const guildData = guildDoc.data() as Guild;
            if (guildData.leader === userId) {
                // For now, leaders can't leave. Future logic could transfer leadership or disband.
                throw new Error("Guild leaders cannot leave their guild. You must disband it or transfer leadership.");
            }

            transaction.update(guildRef, { 
                members: arrayRemove(userId),
                memberCount: increment(-1) 
            });
            transaction.update(userProfileRef, { guildId: '' }); // Or delete the field
        });
    } catch (error) {
        console.error("Failed to leave guild:", error);
        throw error;
    }
}
