
// src/app/quest-kingdom/[trialId]/page.tsx
'use client';

import { KingdomPortal } from "@/components/kingdom/kingdom-portal";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { QuestModule } from "@/lib/types";
import { AppHeader } from "@/components/layout/app-header";
import { Swords, FlaskConical, BookOpen, Castle, type LucideIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const subjectMetadata: { [key: string]: { icon: keyof typeof icons, title: string } } = {
  math: { icon: "castle", title: "Math Kingdom" },
  science: { icon: "flask-conical", title: "Science Stronghold" },
  english: { icon: "book-open", title: "Library of Scribes" },
  history: { icon: "swords", title: "Chronicle Keep" },
  default: { icon: "castle", title: "New Realm" },
};

const icons: Record<string, LucideIcon> = {
  swords: Swords,
  "flask-conical": FlaskConical,
  "book-open": BookOpen,
  castle: Castle,
};


type KingdomData = {
    id: string;
    questCount: number;
    icon: keyof typeof icons;
    title: string;
}

export default function KingdomSelectionPage({ params }: { params: { trialId: string } }) {
    const { trialId } = use(params);
    const [kingdoms, setKingdoms] = useState<KingdomData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getKingdoms = async () => {
            if (!trialId) return;
            setIsLoading(true);
            const questSnapshot = await getDocs(query(collection(db, "quest-modules"), where("trialId", "==", trialId)));
            const quests = questSnapshot.docs.map(doc => doc.data() as QuestModule);

            const kingdomMap: { [kingdomId: string]: { count: number } } = {};

            quests.forEach(quest => {
                const kingdomId = quest.kingdomId;
                if (!kingdomMap[kingdomId]) {
                    kingdomMap[kingdomId] = { count: 0 };
                }
                kingdomMap[kingdomId].count++;
            });
            
            const kingdomData = Object.entries(kingdomMap).map(([id, data]) => ({
                id,
                questCount: data.count,
                ...subjectMetadata[id] || subjectMetadata.default,
                title: subjectMetadata[id]?.title || `${id.charAt(0).toUpperCase() + id.slice(1)} Realm`,
            }));

            setKingdoms(kingdomData);
            setIsLoading(false);
        }
        getKingdoms();
    }, [trialId]);

  return (
    <div className="relative min-h-screen w-full bg-[#110E1B] flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#110E1B]/50 to-[#110E1B] z-0"></div>
      
      <AppHeader />

      <main className="relative z-10 flex flex-col items-center justify-center text-center text-white flex-grow px-4">
        
        <header className="mb-12 text-center relative w-full max-w-5xl mx-auto">
             <Link href="/quest-kingdom" className="absolute top-0 left-0 flex items-center gap-2 text-accent hover:underline transition-all hover:text-yellow-400">
                <ArrowLeft size={20} />
                Back to Trials
            </Link>
            <h1 className="text-5xl md:text-7xl font-bold font-headline text-accent drop-shadow-[0_4px_4px_rgba(0,0,0,0.7)]">
                The Sixth Trial
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mt-4">
                Choose a Kingdom to explore within this trial.
            </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto w-full mb-16">
          {isLoading ? (
            <>
                <Skeleton className="h-[200px] w-full bg-primary/20" />
                <Skeleton className="h-[200px] w-full bg-primary/20" />
                <Skeleton className="h-[200px] w-full bg-primary/20" />
                <Skeleton className="h-[200px] w-full bg-primary/20" />
            </>
          ) : kingdoms.length > 0 ? (
            kingdoms.map(kingdom => (
                <KingdomPortal 
                key={kingdom.id}
                trialId={trialId}
                kingdomId={kingdom.id}
                title={kingdom.title}
                icon={kingdom.icon}
                questCount={kingdom.questCount}
                />
            ))
          ) : (
            <div className="sm:col-span-2 lg:col-span-4 text-center text-foreground/80 p-8 bg-black/20 rounded-lg">
                <p>No kingdoms have been discovered in this trial yet.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
