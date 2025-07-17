// scripts/watch-quests.mjs
import chokidar from 'chokidar';
import { exec } from 'child_process';
import path from 'path';
import 'dotenv/config';

const blueprintsDir = 'src/content-blueprints';

console.log(`[Watcher] Starting to watch for changes in: ${blueprintsDir}`);

const watcher = chokidar.watch(blueprintsDir, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true, // Don't run on startup for existing files
});

// A simple debounce mechanism
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

const handleFileChange = async (filePath) => {
  const fileName = path.basename(filePath);
  console.log(`[Watcher] File change detected: ${fileName}`);

  // 1. Run the Saga Importer to generate .tsx files
  console.log(`[Watcher] Running Saga Importer for ${fileName}...`);
  exec(`npm run import:saga ${fileName}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`[Importer ERROR] exec error: ${error}`);
      return;
    }
    console.log(`[Importer STDOUT] ${stdout}`);
    if (stderr) {
      console.error(`[Importer STDERR] ${stderr}`);
    }

    // 2. Trigger the sync with Firestore database
    console.log('[Watcher] Importer finished. Triggering database sync...');
    const syncUrl = `http://localhost:${process.env.PORT || 9002}/api/sync-quests`;
    fetch(syncUrl)
      .then(res => res.json())
      .then(json => {
        console.log(`[Sync API Response]`, json);
        if (json.synced > 0) {
            // 3. Notify the client to refetch data if sync was successful
            console.log('[Watcher] Sync successful. Notifying client to update...');
            const eventUrl = `http://localhost:${process.env.PORT || 9002}/api/dev-events`;
            fetch(eventUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ event: 'quest-updated', data: 'all' }),
            }).catch(e => console.error('[Watcher] Failed to notify client:', e));
        }
      })
      .catch(err => console.error('[Watcher] Failed to trigger sync API:', err));
  });
};

const debouncedHandler = debounce(handleFileChange, 500);

watcher
  .on('add', (filePath) => debouncedHandler(filePath))
  .on('change', (filePath) => debouncedHandler(filePath))
  .on('unlink', (filePath) => console.log(`[Watcher] File ${path.basename(filePath)} has been removed. Manual cleanup may be needed.`))
  .on('error', (error) => console.error(`[Watcher] Error: ${error}`));

process.on('SIGINT', () => {
  console.log('[Watcher] Shutting down...');
  watcher.close();
  process.exit();
});
