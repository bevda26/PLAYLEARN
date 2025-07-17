// src/app/dashboard/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
// import { AppHeader } from '@/components/layout/app-header'; // Removed as RPGHud is persistent
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, User, Loader2, Moon, Sun, Settings, Swords, Shield, Heart, Star, FlaskConical, BookOpen, Map, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { updateUserProfile } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { useUserProgressStore } from '@/stores/user-progress-store';

const AVATAR_SEEDS = [
    'Felix', 'Mimi', 'Leo', 'Shadow', 'Midnight', 'Jasper', 'Max', 'Gizmo',
    'Loki', 'Cleo', 'Bandit', 'Zoe', 'Simba', 'Toby', 'Rocky', 'Coco'
];

export default function ProfilePage() {
    const { user, userProfile } = useAuth();
    const { toast } = useToast();
    const { theme, setTheme, systemTheme } = useTheme();
    const { health, xp, level, xpToNextLevel, inventory } = useUserProgressStore();
    const [mounted, setMounted] = useState(false);
    
    const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
    const [selectedAvatar, setSelectedAvatar] = useState(userProfile?.avatar || '');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (userProfile) {
            setDisplayName(userProfile.displayName);
            setSelectedAvatar(userProfile.avatar);
        }
    }, [userProfile]);
    
    useEffect(() => setMounted(true), []);

    const handleSaveChanges = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setIsLoading(true);
        try {
            await updateUserProfile(user.uid, {
                displayName: displayName,
                avatar: selectedAvatar
            });
            toast({ title: 'Profile Updated!', description: 'Your new look has been saved.' });
        } catch (error: any) {
            toast({ title: 'Update Failed', description: error.message, variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };
    
    const xpPercentage = (xp / xpToNextLevel) * 100;

    if (!mounted) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin text-accent"/></div>;

    if (!userProfile) {
        return (
             <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
                {/* <AppHeader /> */}
                <main className="max-w-4xl mx-auto p-4 sm:p-8 text-center">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto text-accent" />
                    <p className="text-lg mt-4">Summoning your adventurer's spirit...</p>
                </main>
            </div>
        )
    }

    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-indigo-950 via-gray-950 to-black text-yellow-100 font-body overflow-hidden">
             {/* Background arcane symbols / parchment texture */}
            <div className="absolute inset-0 bg-[url('/images/parchment.png')] bg-cover bg-center opacity-5"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black z-0"></div>

            <main className="relative z-10 max-w-7xl mx-auto p-4 sm:p-8 pt-20">
                 <header className="mb-10 text-center animate-fade-in-down">
                    <Link href="/dashboard" className="flex items-center gap-2 text-accent hover:underline mb-4 w-fit mx-auto font-body">
                        <ArrowLeft size={16} />
                        Return to Scrying Chamber
                    </Link>
                    <h1 className="text-6xl md:text-8xl font-headline text-accent flex items-center justify-center gap-4 drop-shadow-lg leading-tight">
                        <User className="w-16 h-16 text-yellow-400 animate-float-and-glow" />
                        Adventurer's Journal
                        <User className="w-16 h-16 text-yellow-400 animate-float-and-glow" />
                    </h1>
                    <p className="text-xl text-gray-300 mt-4 font-body animate-fade-in delay-100">
                        Behold your legend: customize your visage, hone your skills, and chronicle your epic journey.
                    </p>
                </header>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Character Overview Card */}
                    <Card className="lg:col-span-1 bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-2 border-yellow-700 shadow-xl animate-fade-in-left">
                        <CardHeader>
                            <CardTitle className="text-yellow-300 font-headline text-3xl flex items-center gap-2"><User /> Your Legend</CardTitle>
                            <CardDescription className="text-gray-300">A summary of your heroic journey.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center gap-6">
                            <Image 
                                src={selectedAvatar} 
                                alt="Selected Avatar" 
                                width={160} 
                                height={160} 
                                className="rounded-full bg-primary/20 border-4 border-accent shadow-lg animate-pulse-light"
                            />
                            <div className="text-center">
                                <h3 className="text-4xl font-headline text-yellow-300 mb-1">{userProfile.displayName}</h3>
                                <p className="text-xl text-gray-400 font-body">{userProfile.title || 'Novice Adventurer'}</p>
                            </div>

                            {/* RPG Stats */} 
                            <div className="w-full space-y-3">
                                <div className="flex items-center gap-2">
                                    <Heart className="w-5 h-5 text-red-500" />
                                    <span className="text-red-400 font-bold">Health: 100/100</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FlaskConical className="w-5 h-5 text-blue-500" />
                                    <span className="text-blue-400 font-bold">Mana: 50/50</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Star className="w-5 h-5 text-yellow-500" />
                                    <span className="text-yellow-400 font-bold">Level: {level}</span>
                                </div>
                                <div className="w-full">
                                    <p className="text-sm text-gray-400 mb-1">XP to next level: {xp}/{xpToNextLevel}</p>
                                    <Progress value={xpPercentage} className="w-full h-3 bg-gray-700 border border-yellow-600" indicatorClassName="bg-gradient-to-r from-yellow-500 to-orange-500" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Edit Profile & Settings Card */}
                    <div className="lg:col-span-2 space-y-8 animate-fade-in-right">
                        <form onSubmit={handleSaveChanges}>
                            <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-2 border-yellow-700 shadow-xl">
                                <CardHeader>
                                    <CardTitle className="text-yellow-300 font-headline text-3xl flex items-center gap-2"><User /> Customize Visage</CardTitle>
                                    <CardDescription className="text-gray-300">Shape your adventurer's appearance for the journey ahead.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3">
                                        {AVATAR_SEEDS.map(seed => {
                                            const avatarUrl = `https://api.dicebear.com/8.x/adventurer/svg?seed=${seed}`;
                                            return (
                                                <button 
                                                    key={seed} 
                                                    type="button"
                                                    onClick={() => setSelectedAvatar(avatarUrl)}
                                                    className={cn(
                                                        "rounded-full aspect-square bg-primary/10 p-1 border-2 transition-all transform hover:scale-110",
                                                        selectedAvatar === avatarUrl ? 'border-accent scale-110 ring-2 ring-accent-foreground' : 'border-transparent hover:border-accent'
                                                    )}
                                                >
                                                    <Image src={avatarUrl} alt={seed} width={64} height={64} className="rounded-full" />
                                                </button>
                                            )
                                        })}
                                    </div>
                                    <div>
                                        <Label htmlFor="displayName" className="text-lg text-yellow-200">Adventurer Name</Label>
                                        <Input 
                                            id="displayName" 
                                            value={displayName} 
                                            onChange={(e) => setDisplayName(e.target.value)} 
                                            className="mt-2 text-base bg-gray-700 border-yellow-800 text-white"
                                            placeholder="Enter your heroic name"
                                        />
                                    </div>
                                    <Button type="submit" size="lg" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold text-lg" disabled={isLoading}>
                                        {isLoading ? <Loader2 className="animate-spin mr-2" /> : <Save className="mr-2" />} Seal Your Fate
                                    </Button>
                                </CardContent>
                            </Card>
                        </form>

                        <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-2 border-yellow-700 shadow-xl">
                            <CardHeader>
                                <CardTitle className="text-yellow-300 font-headline text-3xl flex items-center gap-2"><Settings /> Arcane Settings</CardTitle>
                                <CardDescription className="text-gray-300">
                                Unveil the visual magic of your adventure.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <Label className="text-lg text-yellow-200">Realm's Illumination (Theme)</Label>
                                    <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-2 gap-4">
                                        <div>
                                        <RadioGroupItem value="light" id="light" className="peer sr-only" />
                                        <Label
                                            htmlFor="light"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all duration-300 bg-gray-700/50 text-gray-200 hover:bg-yellow-800/30 hover:text-yellow-50"
                                        >
                                            <Sun className="mb-3 h-6 w-6 text-yellow-400" />
                                            Daylight Realm
                                        </Label>
                                        </div>
                                        <div>
                                        <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                                        <Label
                                            htmlFor="dark"
                                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all duration-300 bg-gray-700/50 text-gray-200 hover:bg-yellow-800/30 hover:text-yellow-50"
                                        >
                                            <Moon className="mb-3 h-6 w-6 text-indigo-400" />
                                            Midnight Veil
                                        </Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Placeholder for Inventory/Skills/Journal */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in delay-500">
                    <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-2 border-yellow-700 shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-yellow-300 font-headline text-3xl flex items-center gap-2"><Shield /> Sacred Inventory</CardTitle>
                            <CardDescription className="text-gray-300">Treasures and artifacts collected on your quests.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside text-gray-300 space-y-2">
                                {Object.entries(inventory).length > 0 ? (
                                    Object.entries(inventory).map(([item, quantity]) => (
                                        <li key={item} className="flex items-center gap-2"><span className="text-yellow-400">{quantity}x</span> {item}</li>
                                    ))
                                ) : (
                                    <li>Your satchel is empty, adventurer. Begin your quests!</li>
                                )}
                            </ul>
                            <Button variant="outline" className="mt-4 w-full bg-gray-700 text-gray-300 border-yellow-800 hover:bg-yellow-800/30 hover:text-white" disabled>Explore Satchel (Coming Soon)</Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border-2 border-yellow-700 shadow-xl">
                        <CardHeader>
                            <CardTitle className="text-yellow-300 font-headline text-3xl flex items-center gap-2"><BookOpen /> Arcane Journal</CardTitle>
                            <CardDescription className="text-gray-300">Chronicles of your achievements and learned wisdom.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc list-inside text-gray-300 space-y-2">
                                <li>Completed Quests: {userProfile.questsCompleted ? Object.keys(userProfile.questsCompleted).length : 0}</li>
                                <li>Unlocked Achievements: {userProfile.unlockedAchievements ? Object.keys(userProfile.unlockedAchievements).length : 0}</li>
                                <li>Total XP Gained: {xp}</li>
                            </ul>
                            <Button variant="outline" className="mt-4 w-full bg-gray-700 text-gray-300 border-yellow-800 hover:bg-yellow-800/30 hover:text-white" disabled>Read Journal (Coming Soon)</Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
