// src/app/dashboard/profile/page.tsx
'use client';

import { useState } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { useAuth } from '@/contexts/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, User, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { updateUserProfile } from '@/lib/auth';
import { cn } from '@/lib/utils';

const AVATAR_SEEDS = [
    'Felix', 'Mimi', 'Leo', 'Shadow', 'Midnight', 'Jasper', 'Max', 'Gizmo',
    'Loki', 'Cleo', 'Bandit', 'Zoe', 'Simba', 'Toby', 'Rocky', 'Coco'
];

export default function ProfilePage() {
    const { user, userProfile } = useAuth();
    const { toast } = useToast();
    
    const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
    const [selectedAvatar, setSelectedAvatar] = useState(userProfile?.avatar || '');
    const [isLoading, setIsLoading] = useState(false);

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
    
    if (!userProfile) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-12 h-12 animate-spin"/></div>;

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
                        Customize your adventurer's appearance and name.
                    </p>
                </header>
                
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
            </main>
        </div>
    );
}
