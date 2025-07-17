// src/app/dashboard/page.tsx
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useUserProgressStore } from '@/stores/user-progress-store';
import { AnalyticsCard } from '@/components/dashboard/analytics-card';
import { ProgressChart } from '@/components/dashboard/progress-chart';
import { Award, BookOpen, Star, Swords, CrystalBall, ScrollText, Sparkles, Wand } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button'; // Added missing import
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import type { Timestamp } from 'firebase/firestore';

export default function DashboardPage() {
  const { user, userProfile } = useAuth();
  const { level, xp, xpToNextLevel, questsCompleted, unlockedAchievements } = useUserProgressStore();
  const [oracleMessage, setOracleMessage] = useState<string | null>(null);

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl font-headline mb-4 text-accent">Access Denied</h2>
        <p className="text-gray-400 mb-8">You must be logged in to commune with the Scrying Chamber.</p>
        <Link href="/login">
          <Button>Enter the Portal</Button>
        </Link>
      </div>
    );
  }

  const totalQuestsCompleted = Object.keys(questsCompleted).length;
  const totalAchievements = Object.keys(unlockedAchievements).length;
  const xpPercentage = (xp / xpToNextLevel) * 100;

  const handleOracleConsult = () => {
    const messages = [
      "I sense a great destiny in your mathematical prowess. Delve deeper into the Mystic Mathlands!",
      "The stars align for your next scientific breakthrough. Seek knowledge in the Scientific Citadel!",
      "Your words hold ancient power. The Literary Realms call to your creative spirit.",
      "Echoes of history whisper your name. Uncover forgotten truths in the Chronicle Kingdoms.",
      "Maintain your focus, young adventurer. Consistency is the key to unlocking true power.",
      "A hidden quest awaits your discovery. Observe the world around you.",
      "Your current level is strong, but true mastery requires continuous effort.",
      "The path ahead is clear; continue your diligent studies to reach new heights.",
    ];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setOracleMessage(randomMessage);
    setTimeout(() => setOracleMessage(null), 7000); // Message disappears after 7 seconds
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-950 via-gray-950 to-black text-yellow-100 font-body overflow-hidden">
      {/* TODO: Add mystical ambient music for the scrying chamber */}
      {/* <audio src="/audio/scrying_chamber_theme.mp3" loop autoPlay /> */}

      {/* Background Arcane Runes / Constellation Map */}
      <div className="absolute inset-0 bg-[url('/images/constellation-map.png')] bg-cover bg-center opacity-10 animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black z-0"></div>

      <main className="relative z-10 max-w-7xl mx-auto p-4 sm:p-8 pt-20">
        <header className="mb-10 text-center animate-fade-in-down">
          <h1 className="text-6xl md:text-8xl font-headline text-accent flex items-center justify-center gap-4 drop-shadow-lg leading-tight">
            <CrystalBall className="w-16 h-16 text-blue-400 animate-float-and-glow" />
            The Scrying Chamber
            <CrystalBall className="w-16 h-16 text-blue-400 animate-float-and-glow" />
          </h1>
          <p className="text-xl text-gray-300 mt-4 font-body animate-fade-in delay-100">
            Behold your destiny, {userProfile.displayName}! The mists of fate reveal your progress.
          </p>
        </header>

        {/* Magical Stat Orbs / Glowing Runes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <AnalyticsCard
            title="Current Level"
            value={level}
            icon={Award}
            description="Your adventurer rank."
            className="bg-blue-900/60 border-2 border-blue-700 shadow-xl shadow-blue-500/20 animate-fade-in delay-200"
            valueClassName="text-blue-400 animate-text-glow-blue"
          />
          <AnalyticsCard
            title="Total XP"
            value={xp}
            icon={Star}
            description="Experience flowing through your spirit."
            className="bg-purple-900/60 border-2 border-purple-700 shadow-xl shadow-purple-500/20 animate-fade-in delay-300"
            valueClassName="text-purple-400 animate-text-glow-purple"
            footer={`Next: ${xpToNextLevel} XP`}
            progressValue={xpPercentage}
            progressColor="bg-gradient-to-r from-purple-500 to-indigo-500"
          />
          <AnalyticsCard
            title="Quests Conquered"
            value={totalQuestsCompleted}
            icon={Swords}
            description="Tales of your triumphs."
            className="bg-green-900/60 border-2 border-green-700 shadow-xl shadow-green-500/20 animate-fade-in delay-400"
            valueClassName="text-green-400 animate-text-glow-green"
          />
          <AnalyticsCard
            title="Mystic Achievements"
            value={totalAchievements}
            icon={BookOpen}
            description="Ancient feats accomplished."
            className="bg-yellow-900/60 border-2 border-yellow-700 shadow-xl shadow-yellow-500/20 animate-fade-in delay-500"
            valueClassName="text-yellow-400 animate-text-glow-yellow"
          />
        </div>

        {/* Crystal Ball Analytics & Enchanted Scrolls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <Card className="bg-gray-900/70 border-2 border-blue-700 shadow-2xl shadow-blue-500/30 animate-fade-in-left delay-600">
            <CardHeader>
              <CardTitle className="text-blue-300 font-headline text-3xl flex items-center gap-2"><CrystalBall /> Scrying Pool of Knowledge</CardTitle>
              <CardDescription className="text-gray-300">Gaze upon your learning patterns and future insights.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center relative">
              <ProgressChart completedQuests={questsCompleted} />
            </CardContent>
          </Card>

          <Card className="bg-gray-900/70 border-2 border-green-700 shadow-2xl shadow-green-500/30 animate-fade-in-right delay-700">
            <CardHeader>
              <CardTitle className="text-green-300 font-headline text-3xl flex items-center gap-2"><ScrollText /> Enchanted Scrolls of Progress</CardTitle>
              <CardDescription className="text-gray-300">Your recent achievements unfurl before your eyes.</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] overflow-y-auto custom-scrollbar">
              {unlockedAchievements && Object.keys(unlockedAchievements).length > 0 ? (
                <ul className="space-y-3">
                  {Object.entries(unlockedAchievements).sort(([,dateA], [,dateB]) => {
                    const timeA = (dateA as Timestamp).toMillis();
                    const timeB = (dateB as Timestamp).toMillis();
                    return timeB - timeA;
                  }).slice(0, 5).map(([id, date]) => (
                    <li key={id} className="bg-gray-800/50 p-3 rounded-md border border-green-800 flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-green-400" />
                      <span className="font-bold text-white">{id.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</span>
                      <span className="text-gray-400 text-sm ml-auto">{new Date((date as Timestamp).toDate()).toLocaleDateString()}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-center py-10">No ancient prophecies yet. Begin your quests to forge your legacy!</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Personal Oracle (AI Assistant) */}
        <Card className="bg-gradient-to-br from-indigo-900/70 to-purple-900/70 border-2 border-indigo-700 shadow-2xl shadow-indigo-500/30 animate-fade-in delay-800">
          <CardHeader>
            <CardTitle className="text-indigo-300 font-headline text-3xl flex items-center gap-2"><Wand /> The Personal Oracle</CardTitle>
            <CardDescription className="text-gray-300">A wise old wizard guides your learning path with mystical visions.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-xl text-indigo-200 mb-6 font-body">
              {oracleMessage || "Consult the Oracle for guidance on your next grand endeavor!"}
            </p>
            <Button 
              onClick={handleOracleConsult} 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <CrystalBall className="mr-2 w-5 h-5" /> Consult Oracle
            </Button>
          </CardContent>
        </Card>

        {/* Floating Message for Oracle */}
        {oracleMessage && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-blue-900/90 border-2 border-blue-400 text-white p-4 rounded-lg shadow-2xl z-50 animate-fade-in-up">
            <p>{oracleMessage}</p>
          </div>
        )}

      </main>
    </div>
  );
}
