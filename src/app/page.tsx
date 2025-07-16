import { KingdomPortal } from "@/components/kingdom/kingdom-portal";
import Link from "next/link";
import { Library, Zap, BookOpen, Swords, FlaskConical, Castle, Construction } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MagicalButton } from "@/components/ui/magical-button";
import { AppHeader } from "@/components/layout/app-header";
import { Sparkles } from "lucide-react";

const SparklingCrown = () => (
  <div className="relative mb-4">
    <svg width="80" height="80" viewBox="0 0 100 100" className="text-accent drop-shadow-lg">
      <path d="M10 30 L 20 70 L 35 40 L 50 70 L 65 40 L 80 70 L 90 30 L 70 50 L 50 30 L 30 50 Z" fill="currentColor" stroke="black" strokeWidth="3" />
    </svg>
    <Sparkles className="absolute -top-2 -left-2 w-8 h-8 text-white animate-pulse" />
    <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-white animate-ping" />
     <Sparkles className="absolute bottom-4 right-2 w-5 h-5 text-white animate-pulse" />
  </div>
)

export default async function CastleHomepage() {
  return (
    <div className="relative min-h-screen w-full bg-[#110E1B] flex flex-col" data-ai-hint="fantasy castle night">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#110E1B]/50 to-[#110E1B] z-0"></div>
      
      <AppHeader />

      <main className="relative z-10 flex flex-col items-center justify-center text-center text-parchment-white flex-grow px-4">
        
        <SparklingCrown />

        <h1 className="text-5xl md:text-7xl font-bold font-headline mb-4 bg-gradient-to-r from-accent via-primary to-secondary bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
          PLAYLEARN.TECH
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-slate-300 mb-10">
          Your learning adventure begins now. The gates to the academy are open.
        </p>

        <div className="w-full max-w-xs mx-auto">
            <KingdomPortal 
              subject="class-6"
              title="Enter Class 6"
              icon="castle"
              questCount={0}
            />
        </div>
      </main>
    </div>
  );
}
