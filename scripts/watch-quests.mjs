// scripts/watch-quests.mjs
import chokidar from 'chokidar';
import { exec } from 'child_process';
import path from 'path';
import 'dotenv/config'; // To load NEXT_PUBLIC_ADMIN_USER_ID

console.log('--- PlayLearn Quest Watcher ---');
console.log('Watching for changes in src/content-blueprints...');
console.log('Any new or modified blueprint file will be automatically imported.');
console.log('---');

const blueprintsDir = path.join(process.cwd(), 'src/content-blueprints');

const watcher = chokidar.watch(blueprintsDir, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true, // Don't run on initial scan
});

const processFile = (filePath) => {
  const fileName = path.basename(filePath);
  console.log(`[Watcher] Detected change in: ${fileName}`);
  
  // We use the import:saga script to process the file
  const command = `npm run import:saga ${fileName}`;
  
  console.log(`[Watcher] Executing: ${command}`);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`[Watcher] Error processing ${fileName}:`, error.message);
      if (stderr) console.error(`[Watcher] Stderr:`, stderr);
      return;
    }
    
    // Log standard output from the import script
    if (stdout) console.log(`[Watcher] Import Log for ${fileName}:\n${stdout}`);

    // After successful import, send an SSE event to the dev server
    // to notify the client to refetch data. We extract the questId from the blueprint
    // id to make the event specific. This is a bit of a hack.
     const questId = fileName.replace('.js', '').replace(/\./g, '_');
     
     // Note: The syncQuestsWithFilesystem() function is more robust for a full sync.
     // This event is for more targeted real-time updates during development.
     fetch('http://localhost:9002/api/dev-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'quest-updated', data: questId }),
     }).then(res => {
        if(res.ok) console.log(`[Watcher] Sent 'quest-updated' event for ${questId}`);
        else console.error(`[Watcher] Failed to send 'quest-updated' event.`);
     }).catch(err => console.error(`[Watcher] Error sending event:`, err));
  });
};

watcher
  .on('add', processFile)
  .on('change', processFile);

process.on('SIGINT', () => {
  console.log('--- Shutting down Quest Watcher ---');
  watcher.close();
  process.exit();
});
