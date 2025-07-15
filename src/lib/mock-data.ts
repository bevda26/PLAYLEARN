import type { QuestModule } from './types';
import { PlaceholderQuestComponent } from '@/components/quest/placeholder-quest';

export const mockQuests: QuestModule[] = [
  // Math Quests
  {
    id: 'math-001',
    title: 'The Dragon\'s Hoard: Counting Gold',
    subject: 'math',
    difficulty: 'beginner',
    questType: 'challenge',
    component: PlaceholderQuestComponent,
    metadata: {
      description: 'The great dragon sleeps! Help the villagers count its vast treasure before it awakes.',
      estimatedTime: 15,
      xpReward: 100,
    },
  },
  {
    id: 'math-002',
    title: 'Geomancer\'s Riddle: Shapes of Power',
    subject: 'math',
    difficulty: 'intermediate',
    questType: 'investigation',
    component: PlaceholderQuestComponent,
    metadata: {
      description: 'Unlock the secrets of the Geomancer by identifying powerful geometric shapes in the ancient ruins.',
      estimatedTime: 25,
      xpReward: 250,
    },
  },
   {
    id: 'math-003',
    title: 'Calculus Curse of the Lich King',
    subject: 'math',
    difficulty: 'advanced',
    questType: 'boss',
    component: PlaceholderQuestComponent,
    metadata: {
      description: 'Break the Lich King\'s curse by solving the derivative spells that bind the kingdom.',
      estimatedTime: 60,
      xpReward: 1000,
    },
  },
  // Science Quests
  {
    id: 'science-001',
    title: 'Alchemist\'s Apprentice: Potion Brewing',
    subject: 'science',
    difficulty: 'beginner',
    questType: 'experiment',
    component: PlaceholderQuestComponent,
    metadata: {
      description: 'Learn the basics of chemical reactions by brewing a simple healing potion.',
      estimatedTime: 20,
      xpReward: 150,
    },
  },
  {
    id: 'science-002',
    title: 'Stargazer\'s Prophecy: Celestial Motion',
    subject: 'science',
    difficulty: 'intermediate',
    questType: 'investigation',
    component: PlaceholderQuestComponent,
    metadata: {
      description: 'Chart the paths of the constellations to decipher the Stargazer\'s ancient prophecy.',
      estimatedTime: 30,
      xpReward: 300,
    },
  },
  // Language Quests
  {
    id: 'language-001',
    title: 'The Bard\'s Lost Ballad',
    subject: 'language',
    difficulty: 'beginner',
    questType: 'challenge',
    component: PlaceholderQuestComponent,
    metadata: {
      description: 'Piece together the fragments of a lost ballad by correcting grammatical errors in the verses.',
      estimatedTime: 15,
      xpReward: 100,
    },
  },
  {
    id: 'language-002',
    title: 'Oracle\'s Decree: Reading Comprehension',
    subject: 'language',
    difficulty: 'intermediate',
    questType: 'mastery',
    component: PlaceholderQuestComponent,
    metadata: {
      description: 'Interpret the Oracle\'s cryptic decree to save the village from a looming threat.',
      estimatedTime: 25,
      xpReward: 250,
    },
  },
  // History Quests
  {
    id: 'history-001',
    title: 'Echoes of the Ancients',
    subject: 'history',
    difficulty: 'beginner',
    questType: 'investigation',
    component: PlaceholderQuestComponent,
    metadata: {
      description: 'Explore the Whispering Tombs and place historical artifacts in their correct timeline.',
      estimatedTime: 20,
      xpReward: 120,
    },
  },
  {
    id: 'history-002',
    title: 'The Kingmaker\'s Gambit',
    subject: 'history',
    difficulty: 'advanced',
    questType: 'challenge',
    component: PlaceholderQuestComponent,
    metadata: {
      description: 'Understand the political and social forces that led to the rise of the Mad King.',
      estimatedTime: 45,
      xpReward: 500,
    },
  },
];
