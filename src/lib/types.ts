import type { ComponentType } from 'react';
import type { Timestamp } from 'firebase/firestore';

export interface QuestModule {
  id: string;
  title: string;
  subject: 'math' | 'science' | 'language' | 'history';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questType: 'investigation' | 'experiment' | 'challenge' | 'mastery' | 'boss';
  component?: ComponentType; // Make component optional as it won't be in Firestore
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
  publicStats: {
    questsCompleted: number;
    xp: number;
    level: number;
  };
  settings: {
    sound: boolean;
    notifications: boolean;
  };
}
