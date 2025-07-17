// scripts/sync.mjs
import pkg from '../src/lib/auto-integration/sync-quests.ts';
const { syncQuestsWithFilesystem } = pkg;

async function runSync() {
  console.log('Running manual quest sync...');
  try {
    const result = await syncQuestsWithFilesystem();
    console.log('Manual sync completed:', result);
  } catch (error) {
    console.error('Manual sync failed:', error);
    process.exit(1);
  }
}

runSync();
