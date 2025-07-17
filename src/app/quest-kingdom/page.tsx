import { TrialPortal } from "@/components/kingdom/trial-portal";
import { AppHeader } from "@/components/layout/app-header";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

// Mock data for trials. In the future, this would come from Firestore.
const MOCK_TRIALS = [
    {
        id: 'trial-6',
        name: 'The Sixth Trial',
        description: 'Challenges for the 6th grade level.',
        questCount: 5, // This would be calculated dynamically
        icon: 'castle'
    },
    {
        id: 'trial-7',
        name: 'The Seventh Trial',
        description: 'Challenges for the 7th grade level.',
        questCount: 0, // Not yet available
        icon: 'castle'
    }
]


export default async function QuestKingdomPage() {
  
  return (
    <div className="relative min-h-screen w-full bg-[#110E1B] flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#110E1B]/50 to-[#110E1B] z-0"></div>
      
      <AppHeader />

      <main className="relative z-10 flex flex-col items-center justify-center text-center text-white flex-grow px-4">
        
        <header className="mb-12 text-center relative w-full max-w-5xl mx-auto">
             <Link href="/" className="absolute top-0 left-0 flex items-center gap-2 text-accent hover:underline transition-all hover:text-yellow-400">
                <ArrowLeft size={20} />
                Back to Castle Gates
            </Link>
            <h1 className="text-5xl md:text-7xl font-bold font-headline text-accent drop-shadow-[0_4px_4px_rgba(0,0,0,0.7)]">
                The Quest Kingdom
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mt-4">
                Choose a Trial to begin your learning quest.
            </p>
        </header>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto w-full mb-16">
          {MOCK_TRIALS.map(trial => (
            <TrialPortal 
              key={trial.id}
              trialId={trial.id}
              title={trial.name}
              icon={trial.icon as any}
              questCount={trial.questCount}
            />
          ))}
           {MOCK_TRIALS.length === 0 && (
            <div className="sm:col-span-2 lg:col-span-4 text-center text-foreground/80 p-8 bg-black/20 rounded-lg">
                <p>The realms of knowledge are still forming. Check back soon!</p>
            </div>
           )}
        </div>
      </main>
    </div>
  );
}
