import type { ComponentType } from 'react';

export interface QuestModule {
  id: string;
  title: string;
  subject: 'math' | 'science' | 'language' | 'history';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questType: 'investigation' | 'experiment' | 'challenge' | 'mastery' | 'boss';
  component: ComponentType;
  metadata: {
    description: string;
    estimatedTime: number; // in minutes
    xpReward: number;
    unlockRequirements?: string[];
  };
}
