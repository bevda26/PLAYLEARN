// src/app/dashboard/profile/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, User, Loader2, Moon, Sun, Settings } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { updateUserProfile } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const AVATAR_SEEDS = [
    'Felix', 'Mimi', 'Leo', 'Shadow', 'Midnight', 'Jasper', 'Max', 'Gizmo',
    'Loki', 'Cleo', 'Bandit', 'Zoe', 'Simba', 'Toby', 'Rocky', 'Coco'
];

export default function ProfilePage() {
    const { user, userProfile } = useAuth();
    const { toast } = useToast();
    const { theme, setTheme, systemTheme } = useTheme();
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
    
    if (!mounted) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin"/></div>;

    if (!userProfile) {
        return (
             <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
                <AppHeader />
                <main className="max-w-4xl mx-auto p-4 sm:p-8 text-center">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto" />
                    <p>Loading your profile...</p>
                </main>
            </div>
        )
    }

    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
            <AppHeader />
            <main className="max-w-4xl mx-auto p-4 sm:p-8">
                 <header className="mb-10 text-center">
                    <Link href="/dashboard" className="flex items-center gap-2 text-accent hover:underline mb-4 w-fit mx-auto">
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-5xl font-headline text-accent flex items-center justify-center gap-4">
                        <User className="w-12 h-12" />
                        Edit Profile
                    </h1>
                    <p className="text-lg text-foreground/80 mt-2">
                        Customize your adventurer's appearance, name, and settings.
                    </p>
                </header>
                
                <div className="space-y-8">
                    <form onSubmit={handleSaveChanges}>
                        <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                            <CardHeader>
                                <CardTitle>Your Avatar</CardTitle>
                                <CardDescription>Choose an avatar that represents your spirit.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex justify-center">
                                    <Image 
                                        src={selectedAvatar} 
                                        alt="Selected Avatar" 
                                        width={128} 
                                        height={128} 
                                        className="rounded-full bg-primary/20 border-4 border-accent"
                                        unoptimized
                                    />
                                </div>
                                <div className="grid grid-cols-4 sm:grid-cols-8 gap-4">
                                    {AVATAR_SEEDS.map(seed => {
                                        const avatarUrl = `https://api.dicebear.com/8.x/adventurer/svg?seed=${seed}`;
                                        return (
                                            <button 
                                                key={seed} 
                                                type="button"
                                                onClick={() => setSelectedAvatar(avatarUrl)}
                                                className={cn(
                                                    "rounded-full aspect-square bg-primary/10 p-1 border-2 transition-all",
                                                    selectedAvatar === avatarUrl ? 'border-accent scale-110' : 'border-transparent hover:border-accent'
                                                )}
                                            >
                                                <Image src={avatarUrl} alt={seed} width={64} height={64} unoptimized/>
                                            </button>
                                        )
                                    })}
                                </div>
                                <div>
                                    <Label htmlFor="displayName" className="text-lg">Display Name</Label>
                                    <Input 
                                        id="displayName" 
                                        value={displayName} 
                                        onChange={(e) => setDisplayName(e.target.value)} 
                                        className="mt-2 text-base"
                                    />
                                </div>
                                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                                    {isLoading ? <Loader2 className="animate-spin" /> : "Save Changes"}
                                </Button>
                            </CardContent>
                        </Card>
                    </form>

                     <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Settings /> Appearance</CardTitle>
                            <CardDescription>
                            Change the look and feel of your learning adventure.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                            <Label className="text-lg">Theme</Label>
                            <RadioGroup defaultValue={currentTheme} onValueChange={setTheme} className="grid grid-cols-2 gap-4">
                                <div>
                                <RadioGroupItem value="light" id="light" className="peer sr-only" />
                                <Label
                                    htmlFor="light"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                >
                                    <Sun className="mb-3 h-6 w-6" />
                                    Light
                                </Label>
                                </div>
                                <div>
                                <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                                <Label
                                    htmlFor="dark"
                                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                                >
                                    <Moon className="mb-3 h-6 w-6" />
                                    Dark
                                </Label>
                                </div>
                            </RadioGroup>
                            </div>
                        </CardContent>
                        </Card>
                </div>
            </main>
        </div>
    );
}
