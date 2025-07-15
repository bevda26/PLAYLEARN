import Image from "next/image";
import { KingdomPortal } from "@/components/kingdom/kingdom-portal";
import { mockQuests } from "@/lib/mock-data";
import Link from "next/link";
import { Hammer, Library, Zap, Shield, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/layout/app-header";

export default function CastleHomepage() {
  const subjects = ["math", "science", "language", "history"];
  
  const getQuestCount = (subject: string) => {
    return mockQuests.filter(q => q.subject === subject).length;
  }

  return (
    <div className="relative min-h-screen w-full bg-[#110E1B] flex flex-col">
      <Image
        src="https://placehold.co/1920x1080/000000/FFFFFF.png?text=+"
        alt="Mystical Castle Background"
        fill
        className="absolute inset-0 z-0 object-cover opacity-30"
        data-ai-hint="fantasy castle night"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#110E1B]/50 to-[#110E1B] z-0"></div>
      
      <AppHeader />

      <main className="relative z-10 flex flex-col items-center justify-center text-center text-parchment-white flex-grow px-4">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Wand2 className="w-16 h-16 text-mystic-gold" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold font-headline mb-4 bg-gradient-to-r from-orange-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          Kingdom Academy
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-slate-300 mb-6">
          Enter the mystical realm where learning becomes an epic RPG adventure!
        </p>
        <p className="text-md md:text-lg max-w-3xl text-slate-400 mb-10">
          Embark on magical quests, unlock ancient knowledge, and become the hero of your educational journey.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
            <Link href="/forge">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-primary/40 transition-shadow">
                    <Zap className="mr-3 h-5 w-5" />
                    Begin Your Quest
                </Button>
            </Link>
            <Link href="/language">
                <Button size="lg" variant="outline" className="font-bold text-lg px-8 py-6 rounded-lg bg-black/30 border-accent/50 hover:bg-accent/10">
                    <Library className="mr-3 h-5 w-5" />
                    Explore Library Tower
                </Button>
            </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
          <KingdomPortal 
            subject="math" 
            title="Mathematics Kingdom"
            icon="swords"
            questCount={getQuestCount("math")}
          />
          <KingdomPortal 
            subject="science" 
            title="Science Realm"
            icon="flask-conical"
            questCount={getQuestCount("science")}
          />
          <KingdomPortal 
            subject="language" 
            title="Literature Library"
            icon="book-open"
            questCount={getQuestCount("language")}
          />
          <KingdomPortal 
            subject="history" 
            title="History Hall"
            icon="castle"
            questCount={getQuestCount("history")}
          />
        </div>
      </main>

       <footer className="relative z-10 w-full p-4 mt-12">
        <div className="max-w-6xl mx-auto flex justify-around items-center bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-primary/20">
            <div className="text-center">
                <p className="font-bold text-2xl text-mystic-gold">∞</p>
                <p className="text-sm uppercase text-slate-400">Magical Quests</p>
            </div>
             <div className="text-center">
                <p className="font-bold text-2xl text-mystic-gold">{subjects.length}</p>
                <p className="text-sm uppercase text-slate-400">Kingdom Realms</p>
            </div>
            <div className="text-center">
                <p className="font-bold text-2xl text-mystic-gold">{mockQuests.length}</p>
                <p className="text-sm uppercase text-slate-400">Learning Adventures</p>
            </div>
        </div>
      </footer>
    </div>
  );
}
