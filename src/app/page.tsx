import { KingdomPortal } from "@/components/kingdom/kingdom-portal";
import { mockQuests } from "@/lib/mock-data";
import Link from "next/link";
import { Library, Zap, BookOpen, Swords, FlaskConical, Castle, Construction } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/layout/app-header";
import { Sparkles } from "lucide-react";
import { CastleScene } from "@/components/3d/castle-scene";
import { Suspense } from "react";

const SparklingCrown = () => (
  <div className="relative mb-4">
    <svg width="80" height="80" viewBox="0 0 100 100" className="text-mystic-gold drop-shadow-lg">
      <path d="M10 30 L 20 70 L 35 40 L 50 70 L 65 40 L 80 70 L 90 30 L 70 50 L 50 30 L 30 50 Z" fill="currentColor" stroke="black" strokeWidth="3" />
    </svg>
    <Sparkles className="absolute -top-2 -left-2 w-8 h-8 text-white animate-pulse" />
    <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-white animate-ping" />
     <Sparkles className="absolute bottom-4 right-2 w-5 h-5 text-white animate-pulse" />
  </div>
)

const subjectMetadata: { [key: string]: { icon: keyof typeof icons, title: string } } = {
  math: { icon: "castle", title: "Math Kingdom" },
  science: { icon: "flask-conical", title: "Science Stronghold" },
  language: { icon: "book-open", title: "Library of Scribes" },
  history: { icon: "swords", title: "Chronicle Keep" },
};

const icons: Record<string, LucideIcon> = {
  swords: Swords,
  "flask-conical": FlaskConical,
  "book-open": BookOpen,
  castle: Castle,
};


export default function CastleHomepage() {
  const subjects = ["math", "science", "language", "history"];
  
  const getQuestCount = (subject: string) => {
    return mockQuests.filter(q => q.subject === subject).length;
  }

  return (
    <div className="relative min-h-screen w-full bg-[#110E1B] flex flex-col" data-ai-hint="fantasy castle night">
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <CastleScene />
        </Suspense>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#110E1B]/50 to-[#110E1B] z-0"></div>
      
      <AppHeader />

      <main className="relative z-10 flex flex-col items-center justify-center text-center text-parchment-white flex-grow px-4">
        
        <SparklingCrown />

        <h1 className="text-5xl md:text-7xl font-bold font-headline mb-4 bg-gradient-to-r from-mystic-gold via-primary to-accent bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          PLAYLEARN
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-slate-300 mb-10">
          Your learning adventure begins now. Choose a realm to explore.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto w-full mb-16">
          {subjects.map(subject => (
            <KingdomPortal 
              key={subject}
              subject={`class-6/${subject}`}
              title={subjectMetadata[subject].title}
              icon={subjectMetadata[subject].icon}
              questCount={getQuestCount(subject)}
            />
          ))}
        </div>

        <Link href="/admin/quest-builder">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-primary/40 transition-shadow">
              <Construction className="mr-3 h-5 w-5" />
              Go to the Quest Builder
          </Button>
        </Link>
      </main>
    </div>
  );
}
