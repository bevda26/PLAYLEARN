
// src/app/guilds/[guildId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth-context';
import { leaveGuild } from '@/lib/guilds';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Guild, UserProfile } from '@/lib/types';
import { Loader2, ArrowLeft, LogOut, Crown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type GuildMemberProfile = UserProfile & { id: string };

export default function GuildDetailPage({ params }: { params: { guildId: string } }) {
  const { guildId } = params;
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [guild, setGuild] = useState<Guild | null>(null);
  const [members, setMembers] = useState<GuildMemberProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (!guildId) return;

    const guildRef = doc(db, 'guilds', guildId);
    const unsubscribeGuild = onSnapshot(guildRef, (docSnap) => {
      if (docSnap.exists()) {
        const guildData = { id: docSnap.id, ...docSnap.data() } as Guild;
        setGuild(guildData);
        
        // Fetch member profiles
        if (guildData.members.length > 0) {
            const profilesRef = collection(db, 'user-profiles');
            const q = query(profilesRef, where('__name__', 'in', guildData.members));
            getDocs(q).then(profileSnapshot => {
                const memberProfiles = profileSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GuildMemberProfile));
                setMembers(memberProfiles);
            });
        } else {
            setMembers([]);
        }

      } else {
        setGuild(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribeGuild();
  }, [guildId]);

  const handleLeaveGuild = async () => {
    if (!user || !guild) return;
    setIsLeaving(true);
    try {
      await leaveGuild(guild.id, user.uid);
      toast({ title: `You have left ${guild.name}.` });
      router.push('/guilds');
    } catch (error: any) {
      toast({ title: 'Failed to leave guild', description: error.message, variant: 'destructive' });
    } finally {
      setIsLeaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex items-center justify-center">
        <Loader2 className="w-16 h-16 animate-spin text-accent" />
      </div>
    );
  }

  if (!guild) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-background/80 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-headline text-destructive mb-4">Guild Not Found</h1>
        <p className="text-foreground/80 mb-8">This guild has been disbanded or never existed.</p>
        <Link href="/guilds">
          <Button variant="outline">
            <ArrowLeft className="mr-2" /> Back to Guild Hall
          </Button>
        </Link>
      </div>
    );
  }
  
  const isLeader = user?.uid === guild.leader;
  const isMember = userProfile?.guildId === guild.id;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <AppHeader />
      <main className="max-w-5xl mx-auto p-4 sm:p-8">
        <Link href="/guilds" className="flex items-center gap-2 text-accent hover:underline mb-8">
            <ArrowLeft size={16} />
            Back to Guild Hall
        </Link>
        <header className="mb-10 flex flex-col items-center text-center">
          <span className="text-7xl mb-4">{guild.emblem}</span>
          <h1 className="text-5xl font-headline text-accent">
            {guild.name}
          </h1>
          <p className="text-lg text-foreground/80 mt-2 max-w-2xl">
            {guild.description}
          </p>
        </header>

        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
            <CardHeader>
                <CardTitle>Members ({members.length})</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {members.map(member => (
                        <div key={member.id} className="flex items-center gap-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
                            <Avatar>
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback>{member.displayName[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-bold text-foreground flex items-center gap-2">
                                    {member.displayName}
                                    {member.id === guild.leader && <Crown className="w-4 h-4 text-yellow-400" />}
                                </p>
                                <p className="text-sm text-muted-foreground">{member.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        <div className="mt-8 text-center">
            {isMember && !isLeader && (
                <Button variant="destructive" onClick={handleLeaveGuild} disabled={isLeaving}>
                     {isLeaving ? <Loader2 className="animate-spin" /> : <LogOut className="mr-2" />}
                    Leave Guild
                </Button>
            )}
            {isLeader && (
                 <Button variant="destructive" disabled>
                    Disband Guild (Coming Soon)
                </Button>
            )}
        </div>
        
      </main>
    </div>
  );
}
