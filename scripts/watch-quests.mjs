// scripts/watch-quests.mjs
import chokidar from 'chokidar';
import path from 'path';
import { syncQuestsWithFilesystem } from '../src/lib/auto-integration/sync-quests.ts';

const questsDirectory = path.join(process.cwd(), 'src/quest-modules');

console.log(`[Quest Watcher] Watching for changes in: ${questsDirectory}`);

// A helper function to post events to our dev server
async function postDevEvent(event, data) {
    try {
        await fetch('http://localhost:9002/api/dev-events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event, data }),
        });
    } catch (error) {
        console.error('[Quest Watcher] Failed to post dev event:', error.message);
    }
}


const watcher = chokidar.watch(questsDirectory, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    ignoreInitial: true, // Don't run on startup
});

const handleFileChange = async (filePath) => {
    console.log(`[Quest Watcher] Detected change in: ${path.basename(filePath)}`);
    
    try {
        // Re-sync all quests to ensure consistency
        const { syncedQuests } = await syncQuestsWithFilesystem();
        
        // Extract the quest ID from the file path
        // e.g., '.../src/quest-modules/math/math-001.tsx' -> 'math-001'
        const questId = path.basename(filePath, '.tsx');

        // Check if the changed quest was one of the ones successfully synced
        if (syncedQuests.includes(questId)) {
            console.log(`[Quest Watcher] Notifying client to reload quest: ${questId}`);
            // Send an event to the client to trigger a hot-reload
            await postDevEvent('quest-updated', questId);
        }

    } catch (error) {
        console.error('[Quest Watcher] Error during sync:', error);
    }
};

watcher
    .on('add', handleFileChange)
    .on('change', handleFileChange)
    .on('unlink', (filePath) => {
        // A more robust system would remove the quest from Firestore here.
        console.log(`[Quest Watcher] File removed: ${filePath}. Manual cleanup may be required.`);
    })
    .on('error', (error) => console.error(`[Quest Watcher] Watcher error: ${error}`));

console.log('[Quest Watcher] Ready and waiting for quest module updates...');
