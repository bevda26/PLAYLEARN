
import type { ComponentType } from 'react';
import type { Timestamp } from 'firebase/firestore';

export type ItemId = string; // e.g., 'health_potion', 'golden_key'

export interface QuestModule {
  id: string;
  title: string;
  trialId: string; // e.g., 'grade-6'
  kingdomId: 'math' | 'science' | 'language' | 'history'; // was 'subject'
  sagaId: string; // e.g., 'geometry-basics'
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questType: 'investigation' | 'experiment' | 'challenge' | 'mastery' | 'boss';
  componentPath: string; // Path to the quest module component, e.g., 'trial-6/math/geometry/quest-001.tsx'
  metadata: {
    description: string;
    estimatedTime: number; // in minutes
    xpReward: number;
    itemRewards?: ItemId[]; 
    unlockRequirements?: string[];
  };
  createdAt?: Timestamp;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
}

export interface UserAttributes {
  intellect: number;
  luck: number;
}

export interface UserProfile {
  userId: string;
  email: string | null;
  displayName: string;
  avatar: string;
  title: string;
  unlockedAchievements: { [achievementId: string]: Timestamp };
  createdAt: Timestamp;
  attributes: UserAttributes;
  skillPoints: number;
  guildId?: string;
  currentTrial?: string;
}

export interface UserProgress {
  userId: string;
  xp: number;
  level: number;
  health: number;
  // Track multiple completions with timestamps
  questsCompleted: { [questId: string]: Timestamp[] }; 
  // Track item quantities
  inventory: { [itemId: string]: number };
  // Track progress in a nested structure
  trialProgress?: {
    [trialId: string]: {
      [kingdomId: string]: {
        [sagaId: string]: {
          completedQuests: string[];
          isCompleted: boolean;
        }
      }
    }
  };
}

export interface Guild {
    id: string;
    name: string;
    description: string;
    emblem: string; // Emoji
    leader: string; // userId of the leader
    members: string[]; // array of userIds
    createdAt: Timestamp;
    memberCount: number;
}

export interface Trial {
  id: string; // e.g., 'grade-6'
  name: string; // e.g., 'The Sixth Trial'
  description: string;
}

export interface Kingdom {
  id: 'math' | 'science' | 'language' | 'history';
  name: string; // e.g., 'The Math Kingdom'
}

export interface Saga {
  id: string; // e.g., 'geometry-basics'
  name: string; // e.g., 'The Geometry Saga'
  description: string;
}
