
'use client';

import { useState, useEffect } from 'react';
import { RPGInterface } from '@/components/quest/rpg-interface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft, Clock, Award } from 'lucide-react';
import type { QuestModule } from '@/lib/types';
import { MagicalButton } from '@/components/ui/magical-button';
import type { NextPage } from 'next';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { PlaceholderQuestComponent } from '@/components/quest/placeholder-quest';

function QuestNotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-gradient-to-b from-shadow-black to-background">
            <h1 className="font-headline text-5xl text-dragon-red mb-4">Quest Not Found</h1>
            <p className="text-xl text-parchment-white mb-8">The ancient map is misleading. This quest does not exist in our chronicles.</p>
            <Link href="/" className="flex items-center gap-2 text-accent hover:underline">
                <ArrowLeft size={20} />
                Return to the Castle
            </Link>
        </div>
    )
}

function QuestLoadingSkeleton() {
  return (
    <div className="relative min-h-screen w-full p-4 sm:p-8 flex flex-col items-center justify-center bg-gradient-to-br from-[#1c1a27] via-background to-[#2a2135]">
      <main className="w-full max-w-4xl z-10">
        <Card className="bg-card/60 backdrop-blur-lg border-2 border-primary/30 shadow-2xl shadow-primary/10">
          <CardHeader className="text-center border-b-2 border-primary/20">
            <Skeleton className="h-6 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-32 mx-auto mb-2" />
            <Skeleton className="h-14 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-full max-w-lg mx-auto mt-2" />
            <div className="flex justify-center items-center gap-4 mt-4">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
             <Skeleton className="h-48 w-full" />
          </CardContent>
        </Card>
      </main>
    </div>
  )
}


type QuestPlayerPageProps = {
  params: { subject: string, questId: string };
};

const QuestPlayerPage: NextPage<QuestPlayerPageProps> = ({ params }) => {
  const { questId } = params;

  const [quest, setQuest] = useState<QuestModule | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!questId) return;

    const fetchQuest = async () => {
      setLoading(true);
      const questRef = doc(db, 'quest-modules', questId);
      const docSnap = await getDoc(questRef);

      if (docSnap.exists()) {
        setQuest({ id: docSnap.id, ...docSnap.data() } as QuestModule);
      } else {
        setQuest(null);
      }
      setLoading(false);
    };

    fetchQuest();
  }, [questId]);

  if (loading) {
    return <QuestLoadingSkeleton />;
  }
  
  if (!quest) {
    return <QuestNotFound />;
  }

  const QuestContentComponent = PlaceholderQuestComponent; // All quests use placeholder for now

  return (
    <div className="relative min-h-screen w-full p-4 sm:p-8 flex flex-col items-center justify-center bg-gradient-to-br from-[#1c1a27] via-background to-[#2a2135]">
      <RPGInterface />
      <main className="w-full max-w-4xl z-10">
        <Card className="bg-card/60 backdrop-blur-lg border-2 border-primary/30 shadow-2xl shadow-primary/10">
          <CardHeader className="text-center border-b-2 border-primary/20">
            <Link href={`/${quest.subject}`} className="flex items-center gap-2 text-accent hover:underline mb-4 w-fit mx-auto">
              <ArrowLeft size={16} />
              Return to the {quest.subject.charAt(0).toUpperCase() + quest.subject.slice(1)} Kingdom
            </Link>
            <p className="text-sm uppercase tracking-widest text-accent">{quest.questType} Quest</p>
            <CardTitle className="font-headline text-5xl text-mystic-gold">{quest.title}</CardTitle>
            <CardDescription className="text-foreground/80 mt-2 max-w-2xl mx-auto">{quest.metadata.description}</CardDescription>
            <div className="flex justify-center items-center gap-4 mt-4">
              <Badge variant="outline" className="border-accent/50 capitalize text-accent">{quest.difficulty}</Badge>
              <div className="flex items-center gap-2 text-foreground/80">
                <Clock size={16} />
                <span>{quest.metadata.estimatedTime} min</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/80">
                <Award size={16} className="text-mystic-gold" />
                <span>{quest.metadata.xpReward} XP</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <QuestContentComponent />
          </CardContent>
        </Card>
        <div className="mt-8 text-center">
            <MagicalButton>Complete Quest</MagicalButton>
        </div>
      </main>
    </div>
  );
}

export default QuestPlayerPage;
