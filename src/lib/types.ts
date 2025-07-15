import type { ComponentType } from 'react';
import type { Timestamp } from 'firebase/firestore';

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
    unlockRequirements?: string[];
  };
  createdAt: Timestamp;
}

export interface UserProfile {
  userId: string;
  email: string | null;
  displayName: string;
  avatar: string;
  title: string;
  createdAt: Timestamp;
}

export interface UserProgress {
  userId: string;
  xp: number;
  level: number;
  health: number;
  questsCompleted: { [questId: string]: Timestamp };
}
