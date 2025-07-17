// src/lib/auto-integration/sync-quests.ts
'use server';
/**
 * @fileOverview Scans the filesystem for quest modules and syncs them with Firestore.
 */
import 'server-only'; // Ensures this module only runs on the server

import fs from 'fs/promises';
import path from 'path';
import { upsertQuestModule } from './db-handler';

const questsDirectory = path.join(process.cwd(), 'src/quest-modules');

/**
 * Extracts path-related metadata from the file path.
 * e.g., /english/class6_english_bottle_of_dew/creative_storytelling_challenge.tsx
 * becomes { kingdomId: 'english', sagaId: 'class6_english_bottle_of_dew', questId: 'creative_storytelling_challenge' }
 */
function extractMetadataFromPath(relativePath: string) {
    const parts = relativePath.replace(/\/g, '/').split('/');
    if (parts.length < 3) {
        console.warn(`Could not extract full metadata from path: ${relativePath}`);
        return null;
    }
    const [kingdomId, sagaId, questFile] = parts;
    const questId = questFile.replace(/\.tsx$/, ''); // Remove the file extension

    return { kingdomId, sagaId, questId };
}


/**
 * Scans the src/quest-modules directory, reads metadata from each file,
 * and registers them in Firestore.
 */
export async function syncQuestsWithFilesystem() {
  console.log('Starting quest sync from filesystem...');
  let syncedCount = 0;
  let errorCount = 0;
  const syncedQuests: string[] = [];

  try {
    const subjects = await fs.readdir(questsDirectory, { withFileTypes: true });

    for (const subject of subjects) {
      if (subject.isDirectory()) {
        const subjectPath = path.join(questsDirectory, subject.name);
        const sagas = await fs.readdir(subjectPath, { withFileTypes: true });

        for (const saga of sagas) {
          if (saga.isDirectory()) {
            const sagaPath = path.join(subjectPath, saga.name);
            const questFiles = await fs.readdir(sagaPath);

            for (const questFile of questFiles) {
              if (questFile.endsWith('.tsx')) {
                const relativePath = path.join(subject.name, saga.name, questFile);
                const modulePath = `../../../quest-modules/${relativePath.replace(/\/g, '/')}?v=${Date.now()}`;
                
                try {
                  const module = await import(modulePath);
                  const pathMetadata = extractMetadataFromPath(relativePath);

                  if (module.questModule && pathMetadata) {
                    const fullQuestData = {
                      ...pathMetadata,
                      ...module.questModule,
                      id: pathMetadata.questId,
                      componentPath: relativePath.replace(/\/g, '/'),
                    };
                    
                    await upsertQuestModule(fullQuestData);
                    console.log(`Successfully synced quest: ${fullQuestData.id}`);
                    syncedCount++;
                    syncedQuests.push(fullQuestData.id);
                  } else {
                    console.warn(`Skipping ${relativePath}: No 'questModule' export or path metadata missing.`);
                  }
                } catch (e) {
                  errorCount++;
                  console.error(`Error processing module ${relativePath}:`, e);
                }
              }
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Failed to read quest modules directory:', error);
    throw new Error('Could not complete quest synchronization.');
  }
  
  console.log(`Sync complete. Synced: ${syncedCount}, Errors: ${errorCount}`);
  return { syncedCount, errorCount, syncedQuests };
}
