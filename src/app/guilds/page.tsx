// src/app/guilds/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { AppHeader } from '@/components/layout/app-header'; // Removed as RPGHud is persistent
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
import { Users, Loader2, ShieldPlus, LogIn, Swords, MessageSquareText, ScrollText, Dices } from 'lucide-react';
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
    <Card className="bg-amber-950/70 border-amber-700/50 backdrop-blur-sm flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-amber-500/20">
        <CardHeader>
            <CardTitle className="flex items-center gap-4 text-yellow-300 font-headline text-3xl">
                <span className="text-4xl">{guild.emblem}</span>
                {guild.name}
            </CardTitle>
            <CardDescription className="text-amber-200">{guild.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-end">
            <div className="flex items-center text-amber-300 text-sm mb-4">
                <Users className="w-4 h-4 mr-2 text-amber-400" />
                {guild.memberCount || guild.members.length} brave adventurers
            </div>
            <div className="flex items-center gap-2">
                 <Link href={`/guilds/${guild.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-amber-700/30 text-amber-100 border-amber-500 hover:bg-amber-600/50 hover:text-white">View Tavern</Button>
                </Link>
                {canJoin && (
                    <Button onClick={handleJoinGuild} disabled={isJoining} className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white">
                        {isJoining ? <Loader2 className="animate-spin" /> : <LogIn className="mr-2" />}
                        Join Fellowship
                    </Button>
                )}
                {isMember && (
                    <Button disabled className="flex-1 bg-gray-600 text-gray-300 cursor-not-allowed">Your Fellowship</Button>
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
        toast({title: "By the Mists! A name and purpose are required!", variant: "destructive"});
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
      toast({ title: 'Guild Founded!', description: `The noble fellowship of "${newGuildName}" has been forged!` });
      setCreateDialogOpen(false);
      setNewGuildName('');
      setNewGuildDesc('');
      router.push(`/guilds/${newGuildId}`);
    } catch (error: any) {
      toast({ title: 'Failed to forge guild', description: error.message, variant: 'destructive' });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-amber-950 via-gray-950 to-black text-amber-100 font-body overflow-hidden">
      {/* TODO: Add cozy medieval tavern music and ambient sounds here */}
      {/* <audio src="/audio/tavern_ambience.mp3" loop autoPlay /> */}

      {/* Tavern Background Elements */}
      <div className="absolute inset-0 bg-[url('/images/wood-texture.jpg')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black z-0"></div>
      
      {/* Tavern Visuals - Placeholder for more complex 3D or SVG art */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-amber-900/60 border-t-4 border-amber-700 z-10" /> {/* Floor */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-amber-900/60 border-b-4 border-amber-700 z-10" /> {/* Ceiling */}
      <div className="absolute inset-y-0 left-0 w-24 bg-amber-900/60 border-r-4 border-amber-700 z-10" /> {/* Left Wall */}
      <div className="absolute inset-y-0 right-0 w-24 bg-amber-900/60 border-l-4 border-amber-700 z-10" /> {/* Right Wall */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-48 h-32 bg-red-900/50 rounded-full blur-2xl animate-pulse-light z-10" /> {/* Fireplace glow */}

      <main className="relative z-20 max-w-7xl mx-auto p-4 sm:p-8 pt-20">
        <header className="mb-10 text-center animate-fade-in-down">
          <h1 className="text-6xl md:text-8xl font-headline text-yellow-300 flex items-center justify-center gap-4 drop-shadow-lg leading-tight">
            <Swords className="w-16 h-16 text-yellow-400 animate-float-and-glow" />
            The Adventurer's Tavern
            <Swords className="w-16 h-16 text-yellow-400 animate-float-and-glow" />
          </h1>
          <p className="text-xl text-amber-200 mt-4 font-body animate-fade-in delay-100">
            Gather 'round, weary travelers! Find your fellowship, share tales of glory, and forge new destinies.
          </p>
        </header>
        
        <div className="mb-8 text-center animate-fade-in delay-200">
            {userProfile && !userProfile.guildId ? (
                <Dialog open={isCreateDialogOpen} onOpenChange={setCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xl px-8 py-4 shadow-lg hover:shadow-xl">
                            <ShieldPlus className="mr-3 w-6 h-6" />
                            Forge a New Fellowship
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-800 border-yellow-700 text-white">
                        <DialogHeader>
                            <DialogTitle className="text-yellow-300 font-headline text-3xl">Forge a New Fellowship</DialogTitle>
                            <DialogDescription className="text-gray-300">Gather your companions and establish your legacy. Choose a name, emblem, and purpose worthy of your adventurers!</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreateGuild} className="space-y-4">
                            <div>
                                <Label htmlFor="guild-name" className="text-yellow-200">Fellowship Name</Label>
                                <Input id="guild-name" value={newGuildName} onChange={(e) => setNewGuildName(e.target.value)} required minLength={3} className="bg-gray-700 border-yellow-800 text-white" />
                            </div>
                            <div>
                                <Label htmlFor="guild-desc" className="text-yellow-200">Noble Purpose (Description)</Label>
                                <Input id="guild-desc" value={newGuildDesc} onChange={(e) => setNewGuildDesc(e.target.value)} required className="bg-gray-700 border-yellow-800 text-white" />
                            </div>
                             <div>
                                <Label htmlFor="guild-emblem" className="text-yellow-200">Heraldic Emblem (Single Emoji)</Label>
                                <Input 
                                  id="guild-emblem" 
                                  value={newGuildEmblem} 
                                  onChange={(e) => setNewGuildEmblem(e.target.value)} 
                                  required 
                                  maxLength={2}
                                  pattern="(\p{Emoji_Presentation}|\p{Extended_Pictographic})"
                                  title="Please enter a single emoji."
                                  className="bg-gray-700 border-yellow-800 text-white text-3xl text-center"
                                />
                            </div>
                            <Button type="submit" disabled={isCreating} className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold text-lg">
                                {isCreating ? <Loader2 className="animate-spin mr-2" /> : <ShieldPlus className="mr-2" />}Establish Fellowship
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            ) : (
                 <Link href={userProfile?.guildId ? `/guilds/${userProfile.guildId}` : '#'}>
                    <Button size="lg" variant="secondary" className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xl px-8 py-4 shadow-lg hover:shadow-xl">
                        <Users className="mr-3 w-6 h-6" />
                        Enter Your Fellowship Hall
                    </Button>
                </Link>
            )}
        </div>

        <section className="mb-12 animate-fade-in delay-300">
          <h2 className="text-4xl font-headline text-yellow-300 mb-6 text-center">📜 Guild Recruitment Board 📜</h2>
          <p className="text-lg text-amber-200 mb-8 text-center">Seek out established fellowships to join their ranks:</p>
          {isLoading ? (
             <div className="flex justify-center items-center p-16">
                <Loader2 className="w-12 h-12 animate-spin text-accent" />
                <p className="ml-4 text-xl">Carving guild runes...</p>
            </div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guilds.length > 0 ? guilds.map(guild => (
                    <GuildListCard key={guild.id} guild={guild} />
                )) : (
                    <div className="md:col-span-2 lg:col-span-3 text-center text-gray-400 p-8 bg-gray-900/50 rounded-lg border border-yellow-800">
                        <p className="text-xl">The winds whisper of no active fellowships. Be the first to forge one!</p>
                    </div>
                )}
            </div>
          )}
        </section>

        <section className="mb-12 animate-fade-in delay-400">
          <h2 className="text-4xl font-headline text-yellow-300 mb-6 text-center">🔥 Tavern Activities 🔥</h2>
          <p className="text-lg text-amber-200 mb-8 text-center">Engage in friendly contests and prepare for grand adventures:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-amber-900/60 border border-amber-700 rounded-lg p-6 text-center shadow-lg">
              <Dices className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-headline text-yellow-300 mb-2">Arm Wrestling (Quiz Battles)</h3>
              <p className="text-amber-200">Test your wits against others in quick knowledge duels. (Coming Soon!)</p>
              <Button className="mt-4 bg-gray-700 text-gray-300 cursor-not-allowed">Join Contest</Button>
            </div>
            <div className="bg-amber-900/60 border border-amber-700 rounded-lg p-6 text-center shadow-lg">
              <ScrollText className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-headline text-yellow-300 mb-2">Storytelling Circle</h3>
              <p className="text-amber-200">Share epic tales of your quests and inspire fellow adventurers. (Coming Soon!)</p>
              <Button className="mt-4 bg-gray-700 text-gray-300 cursor-not-allowed">Listen In</Button>
            </div>
            <div className="bg-amber-900/60 border border-amber-700 rounded-lg p-6 text-center shadow-lg">
              <Users className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-headline text-yellow-300 mb-2">Guild Tournaments</h3>
              <p className="text-amber-200">Compete as a guild in grand challenges for ultimate glory. (Coming Soon!)</p>
              <Button className="mt-4 bg-gray-700 text-gray-300 cursor-not-allowed">Register Guild</Button>
            </div>
          </div>
        </section>

        <section className="animate-fade-in delay-500">
          <h2 className="text-4xl font-headline text-yellow-300 mb-6 text-center">🏰 Grand Guild Halls 🏰</h2>
          <p className="text-lg text-amber-200 mb-8 text-center">Each mighty fellowship earns a customizable hall to call their own:</p>
          <div className="bg-amber-900/60 border border-amber-700 rounded-lg p-8 text-center shadow-lg">
            <img src="/images/guild-hall-placeholder.png" alt="Guild Hall Placeholder" className="mx-auto mb-6 w-64 h-auto opacity-70" />
            <p className="text-xl font-bold text-yellow-300 mb-4">Your Guild Hall Awaits!</p>
            <p className="text-amber-200 max-w-2xl mx-auto">Upgrade your stronghold, display your trophies, and train your members within your very own customizable guild hall. Only true fellowships can unlock its potential. (Coming Soon!)</p>
            <Button className="mt-6 bg-gray-700 text-gray-300 cursor-not-allowed">Customize Hall</Button>
          </div>
        </section>

      </main>
    </div>
  );
}
