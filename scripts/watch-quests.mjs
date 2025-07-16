// scripts/watch-quests.mjs
import chokidar from 'chokidar';
import path from 'path';
import { syncQuestsWithFilesystem } from '../src/lib/auto-integration/sync-quests.js';
import 'dotenv/config'; // Make sure to load environment variables

const questsDirectory = path.join(process.cwd(), 'src/quest-modules');

console.log(`[Quest Watcher] Watching for changes in: ${questsDirectory}`);

// A simple debounce mechanism
let debounceTimer;
const debounce = (func, delay) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(func, delay);
};

// Function to trigger the sync and notify the client
const handleFileChange = async (filePath) => {
  console.log(`[Quest Watcher] File change detected: ${path.basename(filePath)}`);
  try {
    const { syncedCount, errorCount, syncedQuests } = await syncQuestsWithFilesystem();
    if (syncedCount > 0 && syncedQuests.length > 0) {
      console.log(`[Quest Watcher] Sync successful. Notifying client of updates...`);
      // Notify the client about each updated quest
      for (const questId of syncedQuests) {
        await notifyClient('quest-updated', questId);
      }
    } else if (errorCount > 0) {
      console.error(`[Quest Watcher] Sync process completed with ${errorCount} errors.`);
    }
  } catch (error) {
    console.error('[Quest Watcher] An error occurred during the sync process:', error);
  }
};

// Function to send an event to the dev-events API route
async function notifyClient(event, data) {
  try {
    const url = 'http://localhost:9002/api/dev-events'; // Use the correct port for your dev server
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ event, data }),
    });
    console.log(`[Quest Watcher] Sent '${event}' event for '${data}' to client.`);
  } catch (error) {
    console.error('[Quest Watcher] Failed to notify client:', error.message);
  }
}

const watcher = chokidar.watch(`${questsDirectory}/**/*.tsx`, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true, // Don't run on initial startup scan
});

watcher
  .on('add', (filePath) => debounce(() => handleFileChange(filePath), 300))
  .on('change', (filePath) => debounce(() => handleFileChange(filePath), 300))
  .on('unlink', (filePath) => console.log(`[Quest Watcher] File ${path.basename(filePath)} has been removed. Manual cleanup may be required.`))
  .on('error', (error) => console.error(`[Quest Watcher] Watcher error: ${error}`));
