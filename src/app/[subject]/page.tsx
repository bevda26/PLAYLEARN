
'use client';

import { useState, useMemo, useEffect } from 'react';
import { QuestCard } from '@/components/quest/quest-card';
import { QuestRecommendations } from '@/components/quest/quest-recommendations';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { NextPage } from 'next';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { QuestModule } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';


type QuestDiscoveryPageProps = {
  params: { subject: string };
};

const QuestDiscoveryPage: NextPage<QuestDiscoveryPageProps> = ({ params }) => {
  const { subject } = params;
  
  const [availableQuests, setAvailableQuests] = useState<QuestModule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [recommendedQuestIds, setRecommendedQuestIds] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchQuests = async () => {
      setIsLoading(true);
      try {
        const questsRef = collection(db, 'quest-modules');
        const q = query(questsRef, where('subject', '==', subject));
        const querySnapshot = await getDocs(q);
        const quests = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as QuestModule));
        setAvailableQuests(quests);
      } catch (error) {
        console.error("Error fetching quests: ", error);
        // Optionally, handle the error in the UI
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuests();
  }, [subject]);


  const subjectTitle = useMemo(() => subject.charAt(0).toUpperCase() + subject.slice(1), [subject]);
  
  const subjectThemes: Record<string, { from: string; to: string }> = {
      math: { from: '#4A148C', to: '#222129' },
      science: { from: '#1E3A8A', to: '#222129' },
      language: { from: '#059669', to: '#222129' },
      history: { from: '#B8860B', to: '#222129' },
  }
  
  const theme = subjectThemes[subject] || { from: '#333', to: '#111' };

  if (!isLoading && availableQuests.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4" style={{ background: `linear-gradient(to bottom, ${theme.from}, ${theme.to})` }}>
        <h1 className="font-headline text-5xl text-mystic-gold mb-4">The {subjectTitle} Kingdom</h1>
        <p className="text-xl text-parchment-white mb-8">This realm is still shrouded in mist. No quests are available yet.</p>
        <Link href="/" className="flex items-center gap-2 text-accent hover:underline">
          <ArrowLeft size={20} />
          Return to the Castle
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full p-4 sm:p-8" style={{ background: `linear-gradient(to bottom, ${theme.from}, ${theme.to})` }}>
      <header className="mb-12 text-center relative">
        <Link href="/" className="absolute top-0 left-0 flex items-center gap-2 text-accent hover:underline transition-all hover:text-mystic-gold">
          <ArrowLeft size={20} />
          Back to Castle
        </Link>
        <h1 className="font-headline text-6xl font-bold text-mystic-gold drop-shadow-[0_4px_4px_rgba(0,0,0,0.7)]">
          The {subjectTitle} Kingdom
        </h1>
        <p className="text-lg text-foreground/80 mt-2">Embark on a quest to master the secrets of this realm.</p>
      </header>
      
      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <h2 className="font-headline text-3xl text-parchment-white mb-6">Available Quests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {isLoading ? (
              <>
                <Skeleton className="h-[140px] w-full rounded-xl bg-primary/20" />
                <Skeleton className="h-[140px] w-full rounded-xl bg-primary/20" />
                <Skeleton className="h-[140px] w-full rounded-xl bg-primary/20" />
                <Skeleton className="h-[140px] w-full rounded-xl bg-primary/20" />
              </>
            ) : (
              availableQuests.map(quest => (
                  <QuestCard
                    key={quest.id}
                    id={quest.id}
                    subject={quest.subject}
                    title={quest.title}
                    difficulty={quest.difficulty}
                    questType={quest.questType}
                    xpReward={quest.metadata.xpReward}
                    isRecommended={recommendedQuestIds.includes(quest.id)}
                  />
              ))
            )}
            </div>
        </div>

        <aside className="lg:col-span-1">
             <h2 className="font-headline text-3xl text-parchment-white mb-6">Need Guidance?</h2>
            <QuestRecommendations 
                availableQuests={availableQuests}
                onRecommendations={setRecommendedQuestIds}
            />
        </aside>
      </main>
    </div>
  );
}

export default QuestDiscoveryPage;
