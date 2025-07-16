// src/app/admin/quest-forge/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page is deprecated and now redirects to the main builder page.
export default function QuestForgeRedirectPage() {
    const router = useRouter();
    useEffect(() => {
        router.replace('/admin/quest-builder');
    }, [router]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background">
            <p>Redirecting to the new Quest Builder...</p>
        </div>
    );
}
