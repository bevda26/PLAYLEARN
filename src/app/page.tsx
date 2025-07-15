import Image from "next/image";
import { KingdomPortal } from "@/components/kingdom/kingdom-portal";
import { mockQuests } from "@/lib/mock-data";

export default function CastleHomepage() {
  const subjects = ["math", "science", "language", "history"];
  
  const getQuestCount = (subject: string) => {
    return mockQuests.filter(q => q.subject === subject).length;
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#4A148C] via-[#1E3A8A] to-background flex flex-col items-center justify-center p-4">
      <Image
        src="https://placehold.co/1920x1080/000000/FFFFFF.png?text=+"
        alt="Mystical Castle Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-20"
        data-ai-hint="fantasy castle night"
      />
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      <main className="relative z-10 flex flex-col items-center justify-center text-center text-parchment-white flex-grow">
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-mystic-gold drop-shadow-[0_4px_4px_rgba(0,0,0,0.7)] mb-4">
          Welcome to QuestLearn
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-slate-300 mb-12">
          Your epic educational RPG adventure begins now. Choose a realm to explore!
        </p>

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
    </div>
  );
}
