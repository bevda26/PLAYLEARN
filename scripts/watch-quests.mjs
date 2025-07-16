// scripts/watch-quests.mjs
import chokidar from 'chokidar';
import path from 'path';
import { fileURLToPath } from 'url';
import { syncQuestsWithFilesystem } from '../src/lib/auto-integration/sync-quests.ts';

// Helper to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questsDirectory = path.join(__dirname, '../src/quest-modules');

console.log(`[Quest Watcher] Watching for file changes in: ${questsDirectory}`);

const watcher = chokidar.watch(`${questsDirectory}/**/*.tsx`, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true, // Don't run on startup, only on changes
});

const handleFileSync = async (filePath) => {
  console.log(`[Quest Watcher] Detected change in: ${path.basename(filePath)}. Syncing with database...`);
  try {
    // We can re-run the full sync. It's idempotent and simple.
    // For a larger project, we might optimize this to sync only the changed file.
    const { syncedCount, errorCount } = await syncQuestsWithFilesystem();
    if (errorCount > 0) {
        console.error(`[Quest Watcher] Sync completed with ${errorCount} errors.`);
    } else {
        console.log(`[Quest Watcher] Sync successful. Total synced: ${syncedCount}.`);
    }
  } catch (error) {
    console.error('[Quest Watcher] An error occurred during synchronization:', error);
  }
};

watcher
  .on('add', handleFileSync)
  .on('change', handleFileSync)
  .on('unlink', (filePath) => {
    // Unlinking is a bit more complex as it would require deleting from Firestore.
    // For now, we'll just log it. A robust implementation would handle this.
    console.log(`[Quest Watcher] Detected deletion of: ${path.basename(filePath)}. Manual cleanup in Firestore may be required.`);
  })
  .on('error', error => console.error(`[Quest Watcher] Watcher error: ${error}`))
  .on('ready', () => console.log('[Quest Watcher] Ready and waiting for changes.'));

// Keep the process running
process.on('SIGINT', () => {
  console.log('[Quest Watcher] Shutting down...');
  watcher.close();
  process.exit(0);
});
