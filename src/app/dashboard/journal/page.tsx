// src/app/dashboard/journal/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { useAuth } from '@/contexts/auth-context';
import { useUserProgressStore } from '@/stores/user-progress-store';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BookMarked, ArrowLeft, Loader2, BookDashed, FileQuestion } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, documentId } from 'firebase/firestore';
import type { QuestModule } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

type CompletedQuestDetails = QuestModule & { completedAt: Date };

export default function JournalPage() {
    const { user } = useAuth();
    const { questsCompleted } = useUserProgressStore();
    const [completedQuests, setCompletedQuests] = useState<CompletedQuestDetails[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchQuestDetails = async () => {
            if (!user || Object.keys(questsCompleted).length === 0) {
                setIsLoading(false);
                return;
            }

            const completedIds = Object.keys(questsCompleted);
            const questsRef = collection(db, 'quest-modules');
            const q = query(questsRef, where(documentId(), 'in', completedIds));
            
            try {
                const querySnapshot = await getDocs(q);
                const questData = querySnapshot.docs.map(doc => {
                    const data = doc.data() as QuestModule;
                    const completedInfo = questsCompleted[doc.id];
                    // Get the most recent completion timestamp
                    const completedAt = completedInfo[completedInfo.length - 1].toDate();
                    return { ...data, id: doc.id, completedAt };
                });
                questData.sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime());
                setCompletedQuests(questData);
            } catch (error) {
                console.error("Error fetching completed quest details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuestDetails();
    }, [user, questsCompleted]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
            <AppHeader />
            <main className="max-w-5xl mx-auto p-4 sm:p-8">
                <header className="mb-10 text-center">
                    <Link href="/dashboard" className="flex items-center gap-2 text-accent hover:underline mb-4 w-fit mx-auto">
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-5xl font-headline text-accent flex items-center justify-center gap-4">
                        <BookMarked className="w-12 h-12" />
                        Quest Journal
                    </h1>
                    <p className="text-lg text-foreground/80 mt-2">
                        A chronicle of your completed adventures.
                    </p>
                </header>

                {isLoading ? (
                     <div className="flex justify-center items-center p-16">
                        <Loader2 className="w-12 h-12 animate-spin text-accent" />
                    </div>
                ) : completedQuests.length === 0 ? (
                     <Card className="text-center bg-card/50 backdrop-blur-sm border-primary/20 p-8">
                        <CardHeader>
                             <BookDashed className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                            <CardTitle className="text-2xl font-headline">The First Page is Blank</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Your journal is empty. Embark on a quest to begin your story!</CardDescription>
                            <Link href="/the-sixth-trial">
                                <Button variant="link" className="text-accent text-lg mt-4">Find a Quest</Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <Accordion type="single" collapsible className="w-full">
                        {completedQuests.map((quest) => (
                            <AccordionItem value={quest.id} key={quest.id} className="bg-card/50 backdrop-blur-sm border-primary/20 rounded-lg mb-4 px-4">
                                <AccordionTrigger className="text-lg font-headline hover:no-underline">
                                    <div className="flex items-center gap-4">
                                        <FileQuestion className="w-6 h-6 text-accent" />
                                        <span>{quest.title}</span>
                                    </div>
                                    <span className="text-sm font-normal text-muted-foreground">{quest.completedAt.toLocaleDateString()}</span>
                                </AccordionTrigger>
                                <AccordionContent className="text-base text-foreground/80 pt-2 pb-4">
                                    {quest.metadata.description}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </main>
        </div>
    );
}
