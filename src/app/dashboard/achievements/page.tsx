// src/app/dashboard/achievements/page.tsx
'use client';

import { AppHeader } from '@/components/layout/app-header';
import { useAuth } from '@/contexts/auth-context';
import { ALL_ACHIEVEMENTS } from '@/lib/achievements';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Award, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function AchievementsPage() {
    const { userProfile } = useAuth();
    const unlockedIds = userProfile ? Object.keys(userProfile.unlockedAchievements) : [];

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
            <AppHeader />
            <main className="max-w-5xl mx-auto p-4 sm:p-8">
                <header className="mb-10 text-center">
                    <Link href="/dashboard" className="flex items-center gap-2 text-accent hover:underline mb-4 w-fit mx-auto">
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-5xl font-headline text-accent flex items-center justify-center gap-4">
                        <Shield className="w-12 h-12" />
                        Hall of Achievements
                    </h1>
                    <p className="text-lg text-foreground/80 mt-2">
                        A record of your heroic deeds and scholarly accomplishments.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ALL_ACHIEVEMENTS.map(achievement => {
                        const isUnlocked = unlockedIds.includes(achievement.id);
                        return (
                            <Card 
                                key={achievement.id}
                                className={cn(
                                    "bg-card/60 backdrop-blur-md border-primary/20 transition-all duration-300",
                                    isUnlocked ? "border-accent shadow-accent/20 shadow-lg" : "border-dashed opacity-70"
                                )}
                            >
                                <CardHeader className="flex flex-row items-center gap-4">
                                    <div className={cn("p-3 rounded-full", isUnlocked ? "bg-accent text-accent-foreground" : "bg-muted")}>
                                        {isUnlocked ? <Award className="w-8 h-8" /> : <Lock className="w-8 h-8" />}
                                    </div>
                                    <div>
                                        <CardTitle className={cn("text-xl", isUnlocked ? "text-accent" : "text-foreground")}>{achievement.name}</CardTitle>
                                        <CardDescription className="mt-1">{achievement.description}</CardDescription>
                                    </div>
                                </CardHeader>
                            </Card>
                        )
                    })}
                </div>
            </main>
        </div>
    );
}
