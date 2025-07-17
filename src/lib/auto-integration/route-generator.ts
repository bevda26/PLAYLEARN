// src/lib/auto-integration/route-generator.ts
'use server';
import 'server-only';

import { upsertQuestModule } from './db-handler'; 
import type { QuestModule } from '@/lib/types';

/**
 * Registers a quest module with the system.
 * Currently, this involves saving it to the database.
 * In the future, this could also handle dynamic route creation if needed.
 * @param questData The quest module data.
 */
export async function registerQuestModule(questData: QuestModule) {
  // For now, we just ensure it's in the database.
  // This decouples the sync script from directly manipulating the database.
  await upsertQuestModule(questData);
}
