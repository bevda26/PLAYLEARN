// src/app/leaderboard/page.tsx
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { Trophy, Loader2 } from 'lucide-react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { UserProfile, UserProgress, Achievement } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/auth-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ALL_ACHIEVEMENTS } from '@/lib/achievements';

type LeaderboardEntry = UserProfile & {
  level: number;
  xp: number;
  rankScore: number;
  recentAchievements: Achievement[];
};

const SUBJECTS = ['math', 'science', 'language', 'history'];

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [allProgress, setAllProgress] = useState<UserProgress[]>([]);
  const [allProfiles, setAllProfiles] = useState<{ [id: string]: UserProfile }>({});
  const [activeTab, setActiveTab] = useState('global');
  const [isLoading, setIsLoading] = useState(true);

  const achievementMap = useMemo(() => new Map(ALL_ACHIEVEMENTS.map(a => [a.id, a])), []);

  // Fetch all data once on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        // Fetch all progress data
        const progressQuery = query(collection(db, 'user-progress'));
        const progressSnapshot = await getDocs(progressQuery);
        const progressData = progressSnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as UserProgress) }));
        setAllProgress(progressData);

        // Fetch all profile data
        const profilesQuery = query(collection(db, 'user-profiles'));
        const profilesSnapshot = await getDocs(profilesQuery);
        const profilesData: { [id: string]: UserProfile } = {};
        profilesSnapshot.forEach(doc => {
          profilesData[doc.id] = { userId: doc.id, ...doc.data() } as UserProfile;
        });
        setAllProfiles(profilesData);

      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // Recalculate leaderboard when tab or data changes
  useEffect(() => {
    if (isLoading) return;

    let rankedData: LeaderboardEntry[];

    if (activeTab === 'global') {
      rankedData = allProgress
        .map(p => ({ progress: p, profile: allProfiles[p.id] }))
        .filter(item => item.profile)
        .sort((a, b) => {
          if (b.progress.level !== a.progress.level) return b.progress.level - a.progress.level;
          return b.progress.xp - a.progress.xp;
        })
        .slice(0, 20)
        .map(({ progress, profile }) => ({
          ...profile,
          level: progress.level,
          xp: progress.xp,
          rankScore: progress.level, // For global, score is level
          recentAchievements: getRecentAchievements(profile, achievementMap),
        }));
    } else {
      // Subject-specific ranking
      rankedData = allProgress
        .map(p => {
          const questCount = Object.keys(p.questsCompleted).filter(id => id.startsWith(activeTab)).length;
          return { progress: p, profile: allProfiles[p.id], questCount };
        })
        .filter(item => item.profile && item.questCount > 0)
        .sort((a, b) => b.questCount - a.questCount)
        .slice(0, 20)
        .map(({ progress, profile, questCount }) => ({
          ...profile,
          level: progress.level,
          xp: progress.xp,
          rankScore: questCount,
          recentAchievements: getRecentAchievements(profile, achievementMap),
        }));
    }

    setLeaderboard(rankedData);

  }, [activeTab, allProgress, allProfiles, isLoading, achievementMap]);

  const getRankColor = (rank: number) => {
    if (rank === 0) return 'text-yellow-400';
    if (rank === 1) return 'text-gray-400';
    if (rank === 2) return 'text-yellow-600';
    return 'text-foreground';
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <AppHeader />
      <main className="max-w-5xl mx-auto p-4 sm:p-8">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-headline text-accent flex items-center justify-center gap-4">
            <Trophy className="w-12 h-12" />
            Hall of Champions
          </h1>
          <p className="text-lg text-foreground/80 mt-2">
            The most accomplished adventurers in the realm.
          </p>
        </header>

        <Card className="bg-card/60 backdrop-blur-md border-primary/20">
          <CardHeader>
            <CardTitle>Rankings</CardTitle>
            <CardDescription>Top players by global rank or by quests completed in a subject.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList>
                <TabsTrigger value="global">Global</TabsTrigger>
                {SUBJECTS.map(subject => (
                  <TabsTrigger key={subject} value={subject} className="capitalize">{subject}</TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {isLoading ? (
              <div className="flex justify-center items-center p-16">
                <Loader2 className="w-12 h-12 animate-spin text-accent" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px] text-center">Rank</TableHead>
                    <TableHead>Player</TableHead>
                    <TableHead className="text-center">{activeTab === 'global' ? 'Level' : 'Quests Done'}</TableHead>
                    <TableHead className="text-right">Recent Feats</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboard.map((player, index) => (
                    <TableRow key={player.userId} className={player.userId === user?.uid ? 'bg-primary/20' : ''}>
                      <TableCell className="font-bold text-2xl text-center">
                        <span className={getRankColor(index)}>{index + 1}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={player.avatar} alt={player.displayName} />
                            <AvatarFallback>{player.displayName[0].toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold">{player.displayName}</p>
                            <p className="text-sm text-muted-foreground">{player.title}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-xl text-center">{player.rankScore}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {player.recentAchievements.map(ach => (
                            <TooltipProvider key={ach.id}>
                              <Tooltip>
                                <TooltipTrigger>
                                  <div className="p-2 rounded-full bg-muted border border-primary/20">
                                    {ach.id.includes('level') ? '🏆' : ach.id.includes('quest') ? '📜' : '🎖️'}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="font-bold">{ach.name}</p>
                                  <p>{ach.description}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            { !isLoading && leaderboard.length === 0 && (
                <div className="text-center p-8 text-muted-foreground">
                    <p>No champions have emerged in this category yet.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

function getRecentAchievements(profile: UserProfile, achievementMap: Map<string, Achievement>): Achievement[] {
  if (!profile.unlockedAchievements) return [];
  
  return Object.entries(profile.unlockedAchievements)
    // @ts-ignore
    .sort(([, a], [, b]) => b.toMillis() - a.toMillis())
    .slice(0, 3)
    .map(([id]) => achievementMap.get(id))
    .filter(Boolean) as Achievement[];
}
