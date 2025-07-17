#!/usr/bin/env node
/**
 * @fileOverview Saga Importer Script
 *
 * This script reads a chapter blueprint from `src/content-blueprints`,
 * processes each quest within its `questArc`, calls an AI to generate
...
    console.log('🟢 Saga import process completed successfully!');

    // Trigger the sync with Firestore database
    console.log('🔵 Triggering database sync...');
    const syncUrl = `http://localhost:${process.env.PORT || 9002}/api/sync-quests`;
    const response = await fetch(syncUrl, { method: 'POST' });
    const json = await response.json();
    console.log(`[Sync API Response]`, json);

    if (json.syncedCount > 0) {
        // Notify the client to refetch data if sync was successful
        console.log('🔵 Sync successful. Notifying client to update...');
        const eventUrl = `http://localhost:${process.env.PORT || 9002}/api/dev-events`;
        await fetch(eventUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event: 'quest-updated', data: 'all' }),
        });
    }


  } catch (error) {
    console.error(`🔴 Error importing saga: ${error.message}`);
    process.exit(1);
  }
}

main();
