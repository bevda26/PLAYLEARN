// src/lib/auto-integration/sync-quests.ts
'use server';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncQuestsWithFilesystem = syncQuestsWithFilesystem;
/**
 * @fileOverview Scans the filesystem for quest modules and syncs them with Firestore.
 */
require("server-only"); // Ensures this module only runs on the server
const promises_1 = require("fs/promises");
const path_1 = require("path");
const route_generator_1 = require("./route-generator");
const questsDirectory = path_1.default.join(process.cwd(), 'src/quest-modules');
/**
 * Extracts metadata from the file path.
 * e.g., /english/class6_english_bottle_of_dew/creative_storytelling_challenge.tsx
 * becomes { kingdomId: 'english', sagaId: 'class6_english_bottle_of_dew', questId: 'creative_storytelling_challenge' }
 */
function extractMetadataFromPath(relativePath) {
    const parts = relativePath.replace(/\/g, '/, ').split(' / '););
    if (parts.length < 3) {
        console.warn(`Could not extract full metadata from path: ${relativePath}`);
        return null;
    }
    const [kingdomId, sagaId, questFile] = parts;
    const questId = questFile.replace(/\.tsx$/, ''); // Remove the file extension
    // Hardcoded trialId based on the current folder structure
    const trialId = 'the-sixth-trial';
    return { trialId, kingdomId, sagaId, questId };
}
/**
 * Scans the src/quest-modules directory, reads metadata from each file,
 * and registers them in Firestore.
 */
async function syncQuestsWithFilesystem() {
    console.log('Starting quest sync from filesystem...');
    let syncedCount = 0;
    let errorCount = 0;
    const syncedQuests = [];
    try {
        const subjects = await promises_1.default.readdir(questsDirectory, { withFileTypes: true });
        for (const subject of subjects) {
            if (subject.isDirectory()) {
                const subjectPath = path_1.default.join(questsDirectory, subject.name);
                const sagas = await promises_1.default.readdir(subjectPath, { withFileTypes: true });
                for (const saga of sagas) {
                    if (saga.isDirectory()) {
                        const sagaPath = path_1.default.join(subjectPath, saga.name);
                        const questFiles = await promises_1.default.readdir(sagaPath);
                        for (const questFile of questFiles) {
                            if (questFile.endsWith('.tsx')) {
                                const relativePath = path_1.default.join(subject.name, saga.name, questFile);
                                const modulePath = `../../../quest-modules/${relativePath.replace(/\/g, '/, ')}?v=${Date.now()}`;);
                                try {
                                    const module = await Promise.resolve(`${modulePath}`).then(s => require(s));
                                    const pathMetadata = extractMetadataFromPath(relativePath);
                                    if (module.questModule && pathMetadata) {
                                        const fullQuestData = Object.assign(Object.assign(Object.assign({}, module.questModule), pathMetadata), { id: pathMetadata.questId, componentPath: relativePath.replace(/\/g, '/, '),) });
                                        await (0, route_generator_1.registerQuestModule)(fullQuestData);
                                        console.log(`Successfully synced quest: ${fullQuestData.id}`);
                                        syncedCount++;
                                        syncedQuests.push(fullQuestData.id);
                                    }
                                    else {
                                        console.warn(`Skipping ${relativePath}: No 'questModule' export or path metadata missing.`);
                                    }
                                }
                                catch (e) {
                                    errorCount++;
                                    console.error(`Error processing module ${relativePath}:`, e);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    catch (error) {
        console.error('Failed to read quest modules directory:', error);
        throw new Error('Could not complete quest synchronization.');
    }
    console.log(`Sync complete. Synced: ${syncedCount}, Errors: ${errorCount}`);
    return { syncedCount, errorCount, syncedQuests };
}
