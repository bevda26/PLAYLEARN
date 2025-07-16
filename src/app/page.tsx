import { AppHeader } from "@/components/layout/app-header";
import { MagicalButton } from "@/components/ui/magical-button";
import Image from "next/image";
import Link from "next/link";


export default async function HomePage() {

  return (
    <div className="relative min-h-screen w-full bg-[#110E1B] flex flex-col items-center justify-center text-center text-white p-4">
      <Image
          src="https://placehold.co/1920x1080/000000/FFFFFF.png?text=+"
          alt="Kingdom Academy background"
          fill
          className="absolute inset-0 z-0 object-cover opacity-30"
          data-ai-hint="fantasy academy castle"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#110E1B] z-0"></div>
      
      <main className="relative z-10 flex flex-col items-center justify-center">
        
        <header className="mb-12">
            <h1 className="text-5xl md:text-7xl font-bold font-headline text-accent drop-shadow-[0_4px_4px_rgba(0,0,0,0.7)]">
                QuestLearn
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mt-4 max-w-2xl">
                Enter the mystical realm where learning becomes an epic RPG adventure!
            </p>
        </header>

        <div className="flex flex-col sm:flex-row gap-4">
            <MagicalButton asChild variant="primary" className="px-12 py-6 text-lg">
                <Link href="/the-sixth-trial">Begin Your Quest</Link>
            </MagicalButton>
             <MagicalButton asChild variant="outline" className="px-12 py-6 text-lg">
                <Link href="/the-sixth-trial">Explore the Kingdoms</Link>
            </MagicalButton>
        </div>
      </main>
    </div>
  );
}
