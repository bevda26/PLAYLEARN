
// src/app/guilds/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AppHeader } from '@/components/layout/app-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/auth-context';
import { createGuild, joinGuild } from '@/lib/guilds';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Guild } from '@/lib/types';
import { Users, Loader2, ShieldPlus, LogIn, Swords } from 'lucide-react';
import Link from 'next/link';

function GuildListCard({ guild }: { guild: Guild }) {
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [isJoining, setIsJoining] = useState(false);

  const handleJoinGuild = async () => {
    if (!user) return;
    setIsJoining(true);
    try {
      await joinGuild(guild.id, user.uid);
      toast({ title: 'Successfully joined guild!', description: `You are now a member of ${guild.name}.` });
    } catch (error: any) {
      toast({ title: 'Failed to join guild', description: error.message, variant: 'destructive' });
    } finally {
      setIsJoining(false);
    }
  };
  
  const isMember = userProfile?.guildId === guild.id;
  const canJoin = !userProfile?.guildId && !isMember;

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-primary/20 flex flex-col">
        <CardHeader>
            <CardTitle className="flex items-center gap-4">
                <span className="text-4xl">{guild.emblem}</span>
                <span className="text-accent">{guild.name}</span>
            </CardTitle>
            <CardDescription>{guild.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-end">
            <div className="flex items-center text-muted-foreground text-sm mb-4">
                <Users className="w-4 h-4 mr-2" />
                {guild.memberCount || guild.members.length} member(s)
            </div>
            <div className="flex items-center gap-2">
                 <Link href={`/guilds/${guild.id}`} className="flex-1">
                    <Button variant="outline" className="w-full">View</Button>
                </Link>
                {canJoin && (
                    <Button onClick={handleJoinGuild} disabled={isJoining} className="flex-1">
                        {isJoining ? <Loader2 className="animate-spin" /> : <LogIn className="mr-2" />}
                        Join
                    </Button>
                )}
                {isMember && (
                    <Button disabled className="flex-1">Already a member</Button>
                )}
            </div>
        </CardContent>
    </Card>
  )
}


export default function GuildsPage() {
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newGuildName, setNewGuildName] = useState('');
  const [newGuildDesc, setNewGuildDesc] = useState('');
  const [newGuildEmblem, setNewGuildEmblem] = useState('🛡️');
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);

  useEffect(() => {
    const guildsRef = collection(db, 'guilds');
    const unsubscribe = onSnapshot(guildsRef, (snapshot) => {
      const allGuilds = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Guild));
      setGuilds(allGuilds);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleCreateGuild = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newGuildName || !newGuildDesc) {
        toast({title: "Please fill out all fields.", variant: "destructive"});
        return;
    };
    setIsCreating(true);
    try {
      const newGuildId = await createGuild({
        name: newGuildName,
        description: newGuildDesc,
        emblem: newGuildEmblem,
        leader: user.uid,
      });
      toast({ title: 'Guild Created!', description: `The guild "${newGuildName}" has been founded.` });
      setCreateDialogOpen(false);
      setNewGuildName('');
      setNewGuildDesc('');
      router.push(`/guilds/${newGuildId}`);
    } catch (error: any) {
      toast({ title: 'Failed to create guild', description: error.message, variant: 'destructive' });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <AppHeader />
      <main className="max-w-7xl mx-auto p-4 sm:p-8">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-headline text-accent flex items-center justify-center gap-4">
            <Swords className="w-12 h-12" />
            Guild Hall
          </h1>
          <p className="text-lg text-foreground/80 mt-2">
            Join forces with fellow adventurers or forge your own path.
          </p>
        </header>
        
        <div className="mb-8 text-center">
            {userProfile && !userProfile.guildId && (
                <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="lg">
                            <ShieldPlus className="mr-2" />
                            Found a New Guild
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Found a New Guild</DialogTitle>
                            <DialogDescription>
                                Create a new guild to rally your allies. Choose a name, emblem, and purpose.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreateGuild} className="space-y-4">
                            <div>
                                <Label htmlFor="guild-name">Guild Name</Label>
                                <Input id="guild-name" value={newGuildName} onChange={(e) => setNewGuildName(e.target.value)} required minLength={3} />
                            </div>
                            <div>
                                <Label htmlFor="guild-desc">Description</Label>
                                <Input id="guild-desc" value={newGuildDesc} onChange={(e) => setNewGuildDesc(e.target.value)} required />
                            </div>
                             <div>
                                <Label htmlFor="guild-emblem">Emblem (Single Emoji)</Label>
                                <Input 
                                  id="guild-emblem" 
                                  value={newGuildEmblem} 
                                  onChange={(e) => setNewGuildEmblem(e.target.value)} 
                                  required 
                                  maxLength={2}
                                  pattern="(\p{Emoji_Presentation}|\p{Extended_Pictographic})"
                                  title="Please enter a single emoji."
                                />
                            </div>
                            <Button type="submit" disabled={isCreating} className="w-full">
                                {isCreating ? <Loader2 className="animate-spin" /> : "Create Guild"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
            {userProfile?.guildId && (
                 <Link href={`/guilds/${userProfile.guildId}`}>
                    <Button size="lg" variant="secondary">
                        <Users className="mr-2" />
                        View Your Guild
                    </Button>
                </Link>
            )}
        </div>

        {isLoading ? (
             <div className="flex justify-center items-center p-16">
                <Loader2 className="w-12 h-12 animate-spin text-accent" />
            </div>
        ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guilds.map(guild => (
                    <GuildListCard key={guild.id} guild={guild} />
                ))}
            </div>
        )}

      </main>
    </div>
  );
}
