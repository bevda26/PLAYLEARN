// src/app/admin/quest-builder/page.tsx
'use client';

import { AppHeader } from '@/components/layout/app-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Construction, Upload } from 'lucide-react';
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
            A powerful tool to craft intricate, multi-step learning adventures.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                <CardHeader>
                    <CardTitle className="text-2xl text-accent font-headline">Under Construction</CardTitle>
                    <CardDescription>
                        This advanced Quest Builder is being forged by the realm's finest architects. It will soon allow you to create multi-part quest arcs from complex data files, like the `class6-math-chapter1` module.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="p-8 text-center bg-background/50 rounded-lg">
                        <Construction className="w-16 h-16 mx-auto text-muted-foreground" />
                        <p className="mt-4 text-muted-foreground">Check back later for powerful new features!</p>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                <CardHeader>
                    <CardTitle className="text-2xl text-accent font-headline">Manual Registration</CardTitle>
                    <CardDescription>
                       For simple, single-component quests, you can still use the original Forge tool. This is useful for quickly adding new standalone challenges.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center items-center h-full">
                   <Link href="/admin/quest-forge">
                        <Button size="lg">
                            Go to the Old Forge
                        </Button>
                   </Link>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
