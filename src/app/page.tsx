import Image from "next/image";
import { KingdomPortal } from "@/components/kingdom/kingdom-portal";
import { mockQuests } from "@/lib/mock-data";
import Link from "next/link";
import { Library, Zap, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppHeader } from "@/components/layout/app-header";
import { Sparkles } from "lucide-react";

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

export default function CastleHomepage() {
  const subjects = ["math", "science", "language", "history"];
  
  const getQuestCount = (subject: string) => {
    return mockQuests.filter(q => q.subject === subject).length;
  }

  return (
    <div className="relative min-h-screen w-full bg-[#110E1B] flex flex-col" data-ai-hint="fantasy castle night">
      <Image
        src="https://images.unsplash.com/photo-1539651044670-315229da9d2f?q=80&w=1920&h=1080&fit=crop"
        alt="Mystical Castle Background"
        fill
        className="absolute inset-0 z-0 object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#110E1B]/50 to-[#110E1B] z-0"></div>
      
      <AppHeader />

      <main className="relative z-10 flex flex-col items-center justify-center text-center text-parchment-white flex-grow px-4">
        
        <SparklingCrown />

        <h1 className="text-5xl md:text-7xl font-bold font-headline mb-4 bg-gradient-to-r from-orange-400 via-purple-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          PLAYLEARN
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-slate-300 mb-6">
          ENTER THE MYSTICAL REALM WHERE LEARNING BECOMES<br/> AN EPIC RPG ADVENTURE!
        </p>
        <p className="text-md md:text-lg max-w-3xl text-slate-400 mb-10">
          Embark on magical quests, unlock ancient knowledge, and become the hero of your educational journey.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
            <Link href="/forge">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-lg px-8 py-6 rounded-lg shadow-lg hover:shadow-primary/40 transition-shadow">
                    <Zap className="mr-3 h-5 w-5" />
                    Begin Your Quest
                </Button>
            </Link>
            <Link href="/language">
                <Button size="lg" variant="outline" className="font-bold text-lg px-8 py-6 rounded-lg bg-black/30 border-accent/50 hover:bg-accent/10 text-white">
                    <BookOpen className="mr-3 h-5 w-5" />
                    Explore Library Tower
                </Button>
            </Link>
        </div>
      </main>

       <footer className="relative z-10 w-full p-4 mt-12 mb-4">
        <div className="max-w-4xl mx-auto flex justify-around items-center">
            <div className="text-center w-48 h-24 flex flex-col justify-center items-center bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-primary/20">
                <p className="font-bold text-3xl text-mystic-gold">∞</p>
                <p className="text-xs uppercase text-slate-400 mt-1">Magical Quests</p>
            </div>
             <div className="text-center w-48 h-24 flex flex-col justify-center items-center bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-primary/20">
                <p className="font-bold text-3xl text-mystic-gold">{subjects.length}</p>
                <p className="text-xs uppercase text-slate-400 mt-1">Kingdom Realms</p>
            </div>
            <div className="text-center w-48 h-24 flex flex-col justify-center items-center bg-black/30 backdrop-blur-sm p-4 rounded-lg border border-primary/20">
                <p className="font-bold text-3xl text-mystic-gold">∞</p>
                <p className="text-xs uppercase text-slate-400 mt-1">Learning Adventures</p>
            </div>
        </div>
      </footer>
    </div>
  );
}
