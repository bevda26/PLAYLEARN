// src/lib/auto-integration/sync-quests.ts
'use server';
/**
 * @fileOverview Scans the filesystem for quest modules and syncs them with Firestore.
 */
import 'server-only'; // Ensures this module only runs on the server

import fs from 'fs/promises';
import path from 'path';
import { registerQuestModule } from './route-generator';

const questsDirectory = path.join(process.cwd(), 'src/quest-modules');

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
        const questFiles = await fs.readdir(subjectPath);

        for (const questFile of questFiles) {
          if (questFile.endsWith('.tsx')) {
            const relativePath = `${subject.name}/${questFile}`;
            // Add a cache-busting query param to ensure we get the latest version
            const modulePath = `../quest-modules/${relativePath}?v=${Date.now()}`;
            
            try {
              const module = await import(modulePath);
              if (module.questModule) {
                // The componentPath is the relative path within src/quest-modules
                const fullQuestData = {
                  ...module.questModule,
                  componentPath: relativePath,
                };
                
                await registerQuestModule(fullQuestData);
                console.log(`Successfully synced quest: ${fullQuestData.id}`);
                syncedCount++;
                syncedQuests.push(fullQuestData.id);
              } else {
                console.warn(`Skipping ${relativePath}: No 'questModule' export found.`);
              }
            } catch (e) {
              errorCount++;
              console.error(`Error processing module ${relativePath}:`, e);
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
