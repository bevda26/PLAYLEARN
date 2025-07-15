// src/app/api/sync-quests/route.ts
import { NextResponse } from 'next/server';
import { syncQuestsWithFilesystem } from '@/lib/auto-integration/sync-quests';

// To prevent this from being a static route
export const dynamic = 'force-dynamic';

/**
 * API route to trigger the synchronization of quests from the filesystem to Firestore.
 * In a real-world scenario, you would protect this route with authentication
 * or a secret key.
 *
 * Example Usage: GET /api/sync-quests
 */
export async function GET() {
  try {
    const { syncedCount, errorCount } = await syncQuestsWithFilesystem();
    return NextResponse.json({
      message: 'Quest synchronization complete.',
      synced: syncedCount,
      errors: errorCount,
    });
  } catch (error: any) {
    console.error('Quest Sync API Error:', error);
    return NextResponse.json(
      { message: 'An error occurred during quest synchronization.', error: error.message },
      { status: 500 }
    );
  }
}
