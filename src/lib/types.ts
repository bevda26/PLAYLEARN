import type { ComponentType } from 'react';
import type { Timestamp } from 'firebase/firestore';

export type ItemId = string; // e.g., 'health_potion', 'golden_key'

export interface QuestModule {
  id: string;
  title: string;
  trialId: string; // e.g., 'grade-6'
  kingdomId: string; // The primary subject category, e.g. 'math'
  sagaId: string; // e.g., 'geometry-basics'
  subjects: string[]; // e.g., ['math', 'visual-reasoning']
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questType: 'investigation' | 'experiment' | 'challenge' | 'mastery' | 'boss';
  componentPath: string; // Path to the quest module component
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
  currentTrial?: string; // The user's selected grade level
}

export interface UserProgress {
  userId: string;
  xp: number;
  level: number;
  health: number;
  // Deprecated flat map, use trialProgress instead
  questsCompleted: { [questId: string]: Timestamp[] }; 
  inventory: { [itemId: string]: number };
  // New nested progress tracking
  trialProgress?: {
    [trialId: string]: {
      [kingdomId: string]: {
        [sagaId: string]: {
          completedQuests: string[];
          isCompleted: boolean;
          lastCompletedTimestamp: Timestamp;
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
  id: string; // e.g., 'math', 'science', 'history'
  name: string; // e.g., 'The Math Kingdom'
}

export interface Saga {
  id: string; // e.g., 'geometry-basics'
  name: string; // e.g., 'The Geometry Saga'
  description: string;
  questIds: string[]; // List of quest IDs in this saga
}
