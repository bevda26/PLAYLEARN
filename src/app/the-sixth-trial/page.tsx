// src/app/the-sixth-trial/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This page is deprecated and now redirects to the main quest kingdom page.
export default function DeprecatedTrialRedirectPage() {
    const router = useRouter();
    useEffect(() => {
        router.replace('/quest-kingdom');
    }, [router]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background">
            <p>Redirecting to the Quest Kingdom...</p>
        </div>
    );
}
