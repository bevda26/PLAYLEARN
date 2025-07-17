// src/lib/data/achievements.ts

import type { Achievement } from '@/lib/types';

/**
 * Master list of all possible achievements in the game.
 * This is kept in a separate file so it can be safely imported by both client and server components.
 */
export const ALL_ACHIEVEMENTS: Achievement[] = [
  { id: 'first_quest', name: 'First Step', description: 'Complete your very first quest.' },
  { id: 'math_novice', name: 'Math Novice', description: 'Complete 1 math quest.' },
  { id: 'level_2', name: 'Level Up!', description: 'Reach level 2.' },
];
