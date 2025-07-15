import { mockQuests } from '@/lib/mock-data';
import { RPGInterface } from '@/components/quest/rpg-interface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { ArrowLeft, Clock, Award } from 'lucide-react';
import type { QuestModule } from '@/lib/types';
import { MagicalButton } from '@/components/ui/magical-button';
import React from 'react';

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


export default function QuestPlayerPage({ params }: { params: { subject: string, questId: string } }) {
  const quest: QuestModule | undefined = React.useMemo(() => 
    mockQuests.find(q => q.id === params.questId && q.subject === params.subject),
    [params.questId, params.subject]
  );

  if (!quest) {
    return <QuestNotFound />;
  }

  const QuestContentComponent = quest.component;

  return (
    <div className="relative min-h-screen w-full p-4 sm:p-8 flex flex-col items-center justify-center bg-gradient-to-br from-[#1c1a27] via-background to-[#2a2135]">
      <RPGInterface />
      <main className="w-full max-w-4xl z-10">
        <Card className="bg-card/60 backdrop-blur-lg border-2 border-primary/30 shadow-2xl shadow-primary/10">
          <CardHeader className="text-center border-b-2 border-primary/20">
            <Link href={`/${quest.subject}`} className="flex items-center gap-2 text-accent hover:underline mb-4 w-fit mx-auto">
              <ArrowLeft size={16} />
              Back to {quest.subject.charAt(0).toUpperCase() + quest.subject.slice(1)} Kingdom
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
