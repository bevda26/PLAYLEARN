// src/app/leaderboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { Trophy, Loader2 } from 'lucide-react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { UserProfile, UserProgress } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/auth-context';

type LeaderboardEntry = UserProfile & {
  level: number;
  xp: number;
};

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        const progressQuery = query(
          collection(db, 'user-progress'),
          orderBy('level', 'desc'),
          orderBy('xp', 'desc'),
          limit(20)
        );
        const progressSnapshot = await getDocs(progressQuery);
        const progressData = progressSnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as UserProgress) }));

        const profileIds = progressData.map(p => p.id);
        if (profileIds.length === 0) {
          setLeaderboard([]);
          setIsLoading(false);
          return;
        }

        const profilesQuery = query(collection(db, 'user-profiles'));
        const profilesSnapshot = await getDocs(profilesQuery);
        const profilesData: { [id: string]: UserProfile } = {};
        profilesSnapshot.forEach(doc => {
            profilesData[doc.id] = doc.data() as UserProfile;
        });
        
        const combinedData = progressData
          .map(p => {
            const profile = profilesData[p.id];
            if (!profile) return null;
            return {
              ...profile,
              level: p.level,
              xp: p.xp,
            };
          })
          .filter(Boolean) as LeaderboardEntry[];

        setLeaderboard(combinedData);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

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
            <CardTitle>Global Rankings</CardTitle>
            <CardDescription>Top 20 players by Level and Experience Points.</CardDescription>
          </CardHeader>
          <CardContent>
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
                    <TableHead className="text-center">Level</TableHead>
                    <TableHead className="text-right">XP</TableHead>
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
                      <TableCell className="font-bold text-xl text-center">{player.level}</TableCell>
                      <TableCell className="text-right">{player.xp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}