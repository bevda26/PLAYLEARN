// src/app/dashboard/page.tsx
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useUserProgressStore } from '@/stores/user-progress-store';
import { AppHeader } from '@/components/layout/app-header';
import { AnalyticsCard } from '@/components/dashboard/analytics-card';
import { ProgressChart } from '@/components/dashboard/progress-chart';
import { Award, BookOpen, Star, Swords, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, userProfile } = useAuth();
  const { level, xp, questsCompleted } = useUserProgressStore();

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <h2 className="text-2xl font-headline mb-4">Access Denied</h2>
        <p className="text-muted-foreground mb-8">You must be logged in to view the dashboard.</p>
        <Link href="/login">
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">Login</button>
        </Link>
      </div>
    );
  }

  const totalQuestsCompleted = Object.keys(questsCompleted).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <AppHeader />
      <main className="max-w-7xl mx-auto p-4 sm:p-8">
        <header className="mb-10">
          <h1 className="text-5xl font-headline text-accent flex items-center gap-4">
            <TrendingUp className="w-12 h-12" />
            Learning Dashboard
          </h1>
          <p className="text-lg text-foreground/80 mt-2">
            An overview of your epic journey, {userProfile.displayName}.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <AnalyticsCard
            title="Current Level"
            value={level}
            icon={Award}
            description="Your adventurer level."
          />
          <AnalyticsCard
            title="Total XP"
            value={xp}
            icon={Star}
            description="Experience points earned."
          />
          <AnalyticsCard
            title="Unique Quests Completed"
            value={totalQuestsCompleted}
            icon={Swords}
            description="Total unique quests conquered."
          />
           <AnalyticsCard
            title="Current Title"
            value={userProfile.title}
            icon={BookOpen}
            description="Your official rank."
          />
        </div>

        <div className="bg-card/50 border border-primary/20 rounded-lg p-6 backdrop-blur-sm shadow-2xl shadow-primary/10">
            <h2 className="text-3xl font-headline text-accent mb-4">Quest Progress by Subject</h2>
            <p className="text-muted-foreground mb-6">Here's a breakdown of the realms you've explored the most.</p>
            <div className="h-[400px]">
                <ProgressChart completedQuests={questsCompleted} />
            </div>
        </div>
      </main>
    </div>
  );
}
