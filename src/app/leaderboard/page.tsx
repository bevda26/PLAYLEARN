// src/app/leaderboard/page.tsx
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
// import { AppHeader } from '@/components/layout/app-header'; // Removed as RPGHud is persistent
import { Trophy, Loader2, MessageSquareText, Swords } from 'lucide-react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { UserProfile, UserProgress, Achievement } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/auth-context';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ALL_ACHIEVEMENTS } from '@/lib/data/achievements';

type LeaderboardEntry = UserProfile & {
  id: string; // Ensure id is part of the type
  level: number;
  xp: number;
  rankScore: number;
  recentAchievements: Achievement[];
};

const SUBJECTS = ['math', 'science', 'language', 'history'];

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [allProfiles, setAllProfiles] = useState<{ [id: string]: UserProfile }>({});
  const [activeTab, setActiveTab] = useState('global');
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null); // For temporary messages

  const achievementMap = useMemo(() => new Map(ALL_ACHIEVEMENTS.map(a => [a.id, a])), []);

  // Fetch all profile data once, as it's small and needed for display.
  useEffect(() => {
    const fetchAllProfiles = async () => {
      const profilesQuery = query(collection(db, 'user-profiles'));
      const profilesSnapshot = await getDocs(profilesQuery);
      const profilesData: { [id: string]: UserProfile } = {};
      profilesSnapshot.forEach(doc => {
        profilesData[doc.id] = { userId: doc.id, ...doc.data() } as UserProfile;
      });
      setAllProfiles(profilesData);
    };
    fetchAllProfiles();
  }, []);

  const fetchLeaderboard = useCallback(async (tab: string) => {
    setIsLoading(true);
    try {
      let rankedData: LeaderboardEntry[] = [];

      if (tab === 'global') {
        const progressQuery = query(
          collection(db, 'user-progress'),
          orderBy('level', 'desc'),
          orderBy('xp', 'desc'),
          limit(20)
        );
        const progressSnapshot = await getDocs(progressQuery);
        
        rankedData = progressSnapshot.docs
          .map(doc => {
            const progress = { id: doc.id, ...doc.data() } as UserProgress;
            const profile = allProfiles[progress.id];
            if (!profile) return null;

            return {
              ...profile,
              id: progress.id,
              level: progress.level,
              xp: progress.xp,
              rankScore: progress.level, // Global rank by level
              recentAchievements: getRecentAchievements(profile, achievementMap),
            };
          })
          .filter((item): item is LeaderboardEntry => item !== null);

      } else {
        const progressQuery = query(collection(db, 'user-progress'));
        const progressSnapshot = await getDocs(progressQuery);
        const allProgress = progressSnapshot.docs.map(doc => ({ id: doc.id, ...(doc.data() as UserProgress) }));

        rankedData = allProgress
          .map(p => {
            const questCount = Object.keys(p.questsCompleted).filter(id => id.startsWith(tab)).length;
            return { progress: p, profile: allProfiles[p.id], questCount };
          })
          .filter(item => item.profile && item.questCount > 0)
          .sort((a, b) => b.questCount - a.questCount)
          .slice(0, 20)
          .map(({ progress, profile, questCount }) => ({
            ...profile,
            id: progress.id,
            level: progress.level,
            xp: progress.xp,
            rankScore: questCount, // Subject rank by quests completed
            recentAchievements: getRecentAchievements(profile, achievementMap),
          }));
      }

      setLeaderboard(rankedData);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [allProfiles, achievementMap]);

  useEffect(() => {
    if (Object.keys(allProfiles).length > 0) {
      fetchLeaderboard(activeTab);
    }
  }, [activeTab, allProfiles, fetchLeaderboard]);

  const handleChallenge = (player: LeaderboardEntry) => {
    setMessage(`You challenged ${player.displayName} to a duel! (Feature coming soon)`);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleSendMessage = (player: LeaderboardEntry) => {
    setMessage(`A raven flies to ${player.displayName} with your message! (Feature coming soon)`);
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white font-body overflow-hidden">
      {/* TODO: Add epic orchestral music background audio here */}
      {/* <audio src="/audio/epic_leaderboard_theme.mp3" loop autoPlay /> */}

      {/* Stone Hall Background & Details */}
      <div className="absolute inset-0 bg-[url('/images/stone-texture.jpg')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black z-0"></div>

      {/* Top Banners & Lighting - Placeholder for 3D elements */}
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-yellow-900/40 to-transparent z-10 flex justify-around items-center opacity-70">
        {[...Array(5)].map((_, i) => (
          <Trophy key={i} className="w-16 h-16 text-yellow-400 opacity-70 animate-pulse-light" style={{ animationDelay: `${i * 0.5}s` }} />
        ))}
      </div>

      <main className="relative z-20 max-w-7xl mx-auto p-4 sm:p-8 pt-20">
        <header className="mb-10 text-center animate-fade-in-down">
          <h1 className="text-6xl md:text-8xl font-headline text-accent flex items-center justify-center gap-4 drop-shadow-lg leading-tight">
            <Trophy className="w-16 h-16 text-yellow-400 animate-float-and-glow" />
            The Champions' Hall
            <Trophy className="w-16 h-16 text-yellow-400 animate-float-and-glow" />
          </h1>
          <p className="text-xl text-gray-300 mt-4 font-body animate-fade-in delay-100">
            Behold the legends of PlayLearn, whose wisdom and valor echo through the ages.
          </p>
        </header>

        {/* Subject Tabs - Integrated into the Hall Design */}
        <div className="flex justify-center mb-10 animate-fade-in delay-200">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-5 bg-gray-800/70 border border-yellow-700 rounded-lg shadow-xl">
              <TabsTrigger value="global" className="text-yellow-400 data-[state=active]:bg-yellow-800/40 data-[state=active]:text-yellow-100 font-bold transition-all duration-300">Global</TabsTrigger>
              {SUBJECTS.map(subject => (
                <TabsTrigger key={subject} value={subject} className="capitalize text-yellow-400 data-[state=active]:bg-yellow-800/40 data-[state=active]:text-yellow-100 font-bold transition-all duration-300">{subject}</TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Champion Display Area */}
        <div className="relative bg-gray-800/60 border-2 border-yellow-800 rounded-xl p-6 md:p-10 shadow-2xl animate-fade-in delay-300">
          {isLoading ? (
            <div className="flex justify-center items-center p-20">
              <Loader2 className="w-16 h-16 animate-spin text-accent" />
              <p className="ml-4 text-xl">Summoning champions...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {leaderboard.slice(0, 3).map((player, index) => (
                <ChampionPodium key={player.id} player={player} rank={index + 1} onChallenge={handleChallenge} onMessage={handleSendMessage} />
              ))}
              {leaderboard.length === 0 && (
                <div className="lg:col-span-3 text-center text-gray-400 p-8">
                  <p className="text-xl">No champions have graced this hall yet. Be the first!</p>
                </div>
              )}
            </div>
          )}

          {/* Remaining Champions as a Scrollable List */}
          {!isLoading && leaderboard.length > 3 && (
            <div className="mt-12 border-t border-yellow-800 pt-8">
              <h3 className="text-3xl font-headline text-yellow-400 mb-6 text-center">Honored Combatants</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                {leaderboard.slice(3).map((player, index) => (
                  <div key={player.id} className="flex items-center justify-between bg-gray-900/50 p-4 rounded-lg border border-gray-700 shadow-md group hover:bg-gray-700/60 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-xl text-yellow-300 w-8 text-center">#{index + 4}</span>
                      <Avatar className="w-10 h-10 border-2 border-blue-400">
                        <AvatarImage src={player.avatar} alt={player.displayName} />
                        <AvatarFallback>{player.displayName[0]?.toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-bold text-lg text-white group-hover:text-yellow-200 transition-colors">{player.displayName}</p>
                        <p className="text-sm text-muted-foreground">{player.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-accent">{activeTab === 'global' ? `Lv ${player.rankScore}` : `${player.rankScore} Quests`}</span>
                      <div className="flex items-center gap-2">
                        {player.recentAchievements.map(ach => (
                          <TooltipProvider key={ach.id}>
                            <Tooltip>
                              <TooltipTrigger>
                                <div className="p-1 rounded-full bg-muted border border-primary/20 hover:scale-110 transition-transform">
                                  {ach.id.includes('level') ? '🏆' : ach.id.includes('quest') ? '📜' : '🎖️'}
                                </div>
                              </TooltipTrigger>
                              <TooltipContent className="bg-gray-900 text-white border-yellow-700">
                                <p className="font-bold">{ach.name}</p>
                                <p>{ach.description}</p>
                              </TooltipContent>
                            </Tooltip>
                          ))}
                      </div>
                      <button 
                        onClick={() => handleChallenge(player)}
                        className="p-2 rounded-full bg-red-800/50 hover:bg-red-700/70 text-red-300 transition-colors"
                        title="Challenge to a Duel"
                      ><Swords size={18} /></button>
                      <button 
                        onClick={() => handleSendMessage(player)}
                        className="p-2 rounded-full bg-blue-800/50 hover:bg-blue-700/70 text-blue-300 transition-colors"
                        title="Send Message"
                      ><MessageSquareText size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Floating Message */} 
          {message && (
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-blue-900/90 border-2 border-blue-400 text-white p-4 rounded-lg shadow-2xl z-50 animate-fade-in-up">
              <p>{message}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Component for Top 3 Champions' Podium
const ChampionPodium = ({ player, rank, onChallenge, onMessage }: { player: LeaderboardEntry; rank: number; onChallenge: (player: LeaderboardEntry) => void; onMessage: (player: LeaderboardEntry) => void; }) => {
  const rankColors = ['text-yellow-300', 'text-gray-400', 'text-yellow-700']; // Gold, Silver, Bronze
  const rankEffects = [
    'scale-110 ring-4 ring-yellow-400/70 shadow-gold-glow',
    'scale-105 ring-2 ring-gray-400/50 shadow-silver-glow',
    'scale-100 ring-1 ring-yellow-700/50 shadow-bronze-glow',
  ];

  return (
    <div className={`relative flex flex-col items-center p-6 rounded-xl border-2 border-yellow-600/70 bg-gray-900/70 shadow-lg transition-all duration-500 hover:scale-[1.02] ${rankEffects[rank - 1] || ''}`}>
      {/* Rank Ornament */}
      <div className={`absolute -top-6 ${rank === 1 ? 'left-1/2 -translate-x-1/2' : rank === 2 ? 'left-8' : 'right-8'} bg-yellow-800 border border-yellow-400 rounded-full w-12 h-12 flex items-center justify-center font-headline text-2xl font-bold ${rankColors[rank - 1]} shadow-lg animate-bounce-subtle`}>
        #{rank}
      </div>

      {/* Avatar & Aura */}
      <div className="relative mb-4 mt-4">
        <Avatar className={`w-32 h-32 border-4 ${rank === 1 ? 'border-yellow-400' : rank === 2 ? 'border-gray-400' : 'border-yellow-700'} shadow-lg`}>
          <AvatarImage src={player.avatar} alt={player.displayName} />
          <AvatarFallback className="text-5xl font-headline bg-gradient-to-br from-purple-600 to-blue-600 text-white">{player.displayName[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>
        {/* Glowing Aura Effect */}
        <div className={`absolute inset-0 rounded-full 
          ${rank === 1 ? 'bg-yellow-400/30 blur-xl animate-pulse-strong' : ''}
          ${rank === 2 ? 'bg-gray-400/20 blur-lg animate-pulse-light' : ''}
          ${rank === 3 ? 'bg-yellow-700/20 blur-md animate-pulse-light' : ''}
        `} />
      </div>

      {/* Champion Info */}
      <h3 className="text-3xl font-bold font-headline text-accent mb-1 text-center">{player.displayName}</h3>
      <p className="text-lg text-gray-300 mb-3 font-body">{player.title}</p>
      <p className="text-xl font-bold text-yellow-400 mb-4">{rank === 1 ? `👑 Grand Champion (Lv ${player.level})` : `Level ${player.level}`}</p>

      {/* Recent Feats / Achievements */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {player.recentAchievements.map(ach => (
          <TooltipProvider key={ach.id}>
            <Tooltip>
              <TooltipTrigger>
                <div className="p-2 rounded-full bg-blue-800/30 border border-blue-400/50 hover:scale-110 transition-transform shadow-md">
                  {ach.id.includes('level') ? '🏆' : ach.id.includes('quest') ? '📜' : '🎖️'}
                </div>
              </TooltipTrigger>
              <TooltipContent className="bg-gray-900 text-white border-blue-700">
                <p className="font-bold">{ach.name}</p>
                <p>{ach.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      {/* Interactive Buttons */}
      <div className="flex gap-3 mt-4">
        <button 
          onClick={() => onChallenge(player)}
          className="px-5 py-2 bg-red-800/50 hover:bg-red-700/70 text-red-300 rounded-lg shadow-md transition-colors flex items-center gap-2 font-bold"
        >
          <Swords size={20} /> Challenge
        </button>
        <button 
          onClick={() => onMessage(player)}
          className="px-5 py-2 bg-blue-800/50 hover:bg-blue-700/70 text-blue-300 rounded-lg shadow-md transition-colors flex items-center gap-2 font-bold"
        >
          <MessageSquareText size={20} /> Message
        </button>
      </div>
    </div>
  );
};

function getRecentAchievements(profile: UserProfile, achievementMap: Map<string, Achievement>): Achievement[] {
  if (!profile.unlockedAchievements) return [];
  
  return Object.entries(profile.unlockedAchievements)
    // @ts-ignore
    .sort(([, a], [, b]) => b.toMillis() - a.toMillis())
    .slice(0, 3)
    .map(([id]) => achievementMap.get(id))
    .filter(Boolean) as Achievement[];
}

