// src/app/admin/quest-builder/page.tsx
'use client';

import { AppHeader } from '@/components/layout/app-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Construction, Wand2, Loader2, Sparkles, FileText } from 'lucide-react';
import Link from 'next/link';

export default function QuestBuilderPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-[#110E1B]">
      <AppHeader />
      <main className="max-w-7xl mx-auto p-4 sm:p-8">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-headline text-mystic-gold flex items-center justify-center gap-4">
            <Construction className="w-12 h-12" />
            The QuestLearn Builder
          </h1>
          <p className="text-lg text-foreground/80 mt-2">
            A powerful suite of tools to craft intricate learning adventures.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                <CardHeader>
                    <CardTitle className="text-2xl text-accent font-headline flex items-center gap-2">
                        <Sparkles className="w-6 h-6" />
                        AI-Powered Generation
                    </CardTitle>
                    <CardDescription>
                        Generate a complete, multi-activity quest from a single learning objective. The AI will handle the creative work.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <Textarea
                            placeholder="Enter a learning objective, e.g., 'Understand the difference between odd and even numbers' or 'Learn about the phases of the moon'"
                            rows={3}
                            className="bg-background/50"
                        />
                        <Button type="submit" className="w-full" disabled>
                            <Wand2 className="mr-2 h-5 w-5" />
                            Generate Quest (Coming Soon)
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-8">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                    <CardHeader>
                        <CardTitle className="text-2xl text-accent font-headline flex items-center gap-2">
                            <FileText className="w-6 h-6" />
                            Full Module Processing
                        </CardTitle>
                        <CardDescription>
                            This advanced tool will eventually allow you to process complex data files, like your `class6-math-chapter1` module, into a full quest arc.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="p-8 text-center bg-background/50 rounded-lg">
                            <Construction className="w-16 h-16 mx-auto text-muted-foreground" />
                            <p className="mt-4 text-muted-foreground">This feature is under construction.</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                    <CardHeader>
                        <CardTitle className="text-2xl text-accent font-headline">Manual Registration</CardTitle>
                        <CardDescription>
                           For simple, single-component quests, you can still use the original Forge tool.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center">
                       <Link href="/admin/quest-forge">
                            <Button size="lg">
                                Go to the Old Forge
                            </Button>
                       </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}
