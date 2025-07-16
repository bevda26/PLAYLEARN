
import type { ComponentType } from 'react';
import type { Timestamp } from 'firebase/firestore';

export type ItemId = string; // e.g., 'health_potion', 'golden_key'

export interface QuestModule {
  id: string;
  title: string;
  subject: 'math' | 'science' | 'language' | 'history';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questType: 'investigation' | 'experiment' | 'challenge' | 'mastery' | 'boss';
  componentPath: string; // Path to the quest module component, e.g., 'math/math-001.tsx'
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
}
