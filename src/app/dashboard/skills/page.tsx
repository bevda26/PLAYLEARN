// src/app/dashboard/skills/page.tsx
'use client';

import { useState } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { spendSkillPoint } from '@/lib/skills';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Brain, BrainCircuit, Dices, PlusCircle, Sparkles, Loader2 } from 'lucide-react';
import Link from 'next/link';

type AttributeType = 'intellect' | 'luck';

export default function SkillsPage() {
    const { user, userProfile } = useAuth();
    const { toast } = useToast();
    const [loadingAttribute, setLoadingAttribute] = useState<AttributeType | null>(null);

    const handleSpendPoint = async (attribute: AttributeType) => {
        if (!user || !userProfile || userProfile.skillPoints <= 0) {
            toast({ title: "Not enough skill points!", variant: 'destructive' });
            return;
        }
        setLoadingAttribute(attribute);
        try {
            await spendSkillPoint(user.uid, attribute);
            toast({ title: "Attribute Increased!", description: `You have successfully increased your ${attribute}.` });
        } catch (error: any) {
            toast({ title: "Upgrade Failed", description: error.message, variant: 'destructive' });
        } finally {
            setLoadingAttribute(null);
        }
    };

    if (!userProfile) {
        return (
             <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
                <AppHeader />
                <main className="max-w-4xl mx-auto p-4 sm:p-8 text-center">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto" />
                    <p>Loading your skills...</p>
                </main>
            </div>
        )
    }

    const { skillPoints, attributes } = userProfile;

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
                        <BrainCircuit className="w-12 h-12" />
                        Attribute Allocation
                    </h1>
                    <p className="text-lg text-foreground/80 mt-2">
                        Use your skill points to enhance your learning abilities.
                    </p>
                </header>
                
                <Card className="mb-8 bg-card/50 backdrop-blur-sm border-primary/20 text-center">
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline">Available Skill Points</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-6xl font-bold text-accent">{skillPoints}</p>
                        <CardDescription className="mt-2">You gain 1 skill point each time you level up.</CardDescription>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 font-headline text-xl">
                                <Brain className="text-primary w-8 h-8"/>
                                Intellect
                            </CardTitle>
                             <CardDescription>
                                Each point increases your XP gain from all quests by 2%.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center space-y-4">
                            <p className="text-5xl font-bold text-primary">{attributes.intellect}</p>
                            <Button onClick={() => handleSpendPoint('intellect')} disabled={skillPoints <= 0 || !!loadingAttribute}>
                                {loadingAttribute === 'intellect' ? <Loader2 className="animate-spin" /> : <PlusCircle />}
                                Spend 1 Point
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                        <CardHeader>
                             <CardTitle className="flex items-center gap-3 font-headline text-xl">
                                <Dices className="text-accent w-8 h-8"/>
                                Luck
                            </CardTitle>
                             <CardDescription>
                                Each point increases your chance to find bonus item rewards by 1%.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center space-y-4">
                            <p className="text-5xl font-bold text-accent">{attributes.luck}</p>
                             <Button onClick={() => handleSpendPoint('luck')} disabled={skillPoints <= 0 || !!loadingAttribute}>
                                {loadingAttribute === 'luck' ? <Loader2 className="animate-spin" /> : <PlusCircle />}
                                Spend 1 Point
                            </Button>
                        </CardContent>
                    </Card>
                </div>

            </main>
        </div>
    )
}
