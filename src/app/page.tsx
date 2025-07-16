import { KingdomPortal } from "@/components/kingdom/kingdom-portal";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { QuestModule } from "@/lib/types";
import { AppHeader } from "@/components/layout/app-header";
import { Swords, FlaskConical, BookOpen, Castle, type LucideIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";


const subjectMetadata: { [key: string]: { icon: keyof typeof icons, title: string } } = {
  math: { icon: "castle", title: "Math Kingdom" },
  science: { icon: "flask-conical", title: "Science Stronghold" },
  language: { icon: "book-open", title: "Library of Scribes" },
  history: { icon: "swords", title: "Chronicle Keep" },
  default: { icon: "castle", title: "New Realm" },
};

const icons: Record<string, LucideIcon> = {
  swords: Swords,
  "flask-conical": FlaskConical,
  "book-open": BookOpen,
  castle: Castle,
};

async function getKingdoms() {
    const questSnapshot = await getDocs(collection(db, "quest-modules"));
    const quests = questSnapshot.docs.map(doc => doc.data() as QuestModule);

    const kingdoms: { [subject: string]: { count: number } } = {};

    quests.forEach(quest => {
        if (!quest.id.startsWith('math-') && !quest.id.startsWith('science-') && !quest.id.startsWith('language-') && !quest.id.startsWith('history-')) return;

        if (!kingdoms[quest.subject]) {
            kingdoms[quest.subject] = { count: 0 };
        }
        kingdoms[quest.subject].count++;
    });
    
    return Object.entries(kingdoms).map(([subject, data]) => ({
        subject,
        questCount: data.count,
        ...subjectMetadata[subject] || subjectMetadata.default,
        title: subjectMetadata[subject]?.title || `${subject.charAt(0).toUpperCase() + subject.slice(1)} Realm`,
    }));
}


export default async function SubjectSelectionPage() {
  const kingdoms = await getKingdoms();
  
  return (
    <div className="relative min-h-screen w-full bg-[#110E1B] flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#110E1B]/50 to-[#110E1B] z-0"></div>
      
      <AppHeader />

      <main className="relative z-10 flex flex-col items-center justify-center text-center text-parchment-white flex-grow px-4">
        
        <header className="mb-12 text-center relative w-full max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold font-headline text-accent drop-shadow-[0_4px_4px_rgba(0,0,0,0.7)]">
            Hall of Kingdoms
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mt-4">
            Choose a subject to begin your learning quest.
            </p>
        </header>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto w-full mb-16">
          {kingdoms.map(kingdom => (
            <KingdomPortal 
              key={kingdom.subject}
              subject={kingdom.subject}
              title={kingdom.title}
              icon={kingdom.icon}
              questCount={kingdom.questCount}
            />
          ))}
           {kingdoms.length === 0 && (
            <div className="sm:col-span-2 lg:col-span-4 text-center text-foreground/80 p-8 bg-black/20 rounded-lg">
                <p>The realms of knowledge are still forming. Check back soon!</p>
            </div>
           )}
        </div>
      </main>
    </div>
  );
}
