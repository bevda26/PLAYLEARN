
import { AppHeader } from "@/components/layout/app-header";
import { MagicalButton } from "@/components/ui/magical-button";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Parallax scrolling container component
const ParallaxContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("relative h-screen w-full perspective-[1px] overflow-x-hidden overflow-y-auto", className)}>
    {children}
  </div>
);

// Parallax section component
const ParallaxSection = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <section className={cn("relative h-screen w-full flex items-center justify-center preserve-3d", className)}>
    {children}
  </section>
);

// Parallax layer component
const ParallaxLayer = ({ children, className, depth = 0 }: { children: React.ReactNode, className?: string, depth?: number }) => (
  <div className={cn("absolute inset-0", className)} style={{ transform: `translateZ(${depth}px) scale(${1 + -depth})` }}>
    {children}
  </div>
);

export default async function HomePage() {
  return (
    <div className="bg-[#110E1B] text-white">
      <AppHeader />
      <ParallaxContainer>
        {/* Section 1: The Gates of PlayLearn */}
        <ParallaxSection className="bg-[#110E1B]">
          <ParallaxLayer depth={-2}>
            <Image
              src="https://placehold.co/1920x1080.png"
              alt="Kingdom Academy background"
              fill
              className="object-cover opacity-30"
              data-ai-hint="fantasy academy castle"
              priority
            />
          </ParallaxLayer>
          <ParallaxLayer depth={-1}>
             <div className="absolute inset-0 bg-gradient-to-t from-[#110E1B] via-transparent to-transparent z-10"></div>
          </ParallaxLayer>
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-5xl md:text-7xl font-bold font-headline text-accent drop-shadow-[0_4px_4px_rgba(0,0,0,0.7)]">
              PlayLearn
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mt-4 max-w-2xl">
              Your epic learning adventure awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <MagicalButton asChild variant="primary" className="px-12 py-6 text-lg">
                <Link href="/the-sixth-trial">Begin Your Quest</Link>
              </MagicalButton>
              <MagicalButton asChild variant="outline" className="px-12 py-6 text-lg">
                <Link href="/the-sixth-trial">Explore the Kingdoms</Link>
              </MagicalButton>
            </div>
            <div className="absolute bottom-[-10rem] flex flex-col items-center gap-2 animate-bounce">
                <span className="text-sm uppercase">Scroll Down</span>
                <ArrowDown />
            </div>
          </div>
        </ParallaxSection>

        {/* Section 2: Forge Your Hero */}
        <ParallaxSection className="bg-gradient-to-b from-[#110E1B] to-[#1a1529]">
           <div className="relative z-10 text-center max-w-4xl mx-auto p-4">
              <h2 className="text-4xl md:text-6xl font-headline text-accent mb-4">From Apprentice to Archmage.</h2>
              <p className="text-lg md:text-xl text-slate-300 mb-12">Your knowledge is your power. Level up, earn new titles, and customize your hero to reflect your mastery.</p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <div className="text-center">
                    <Image src="https://api.dicebear.com/8.x/adventurer/svg?seed=Felix" alt="Apprentice Avatar" width={150} height={150} className="rounded-full bg-black/20 p-2 border-2 border-muted" unoptimized/>
                    <p className="mt-2 font-bold text-lg">Novice Learner</p>
                  </div>
                  <div className="text-5xl font-extrabold text-accent animate-pulse">&rarr;</div>
                   <div className="text-center">
                    <Image src="https://api.dicebear.com/8.x/adventurer/svg?seed=Leo" alt="Archmage Avatar" width={150} height={150} className="rounded-full bg-accent/20 p-2 border-2 border-accent" unoptimized/>
                    <p className="mt-2 font-bold text-lg text-accent">Seasoned Explorer</p>
                  </div>
              </div>
           </div>
        </ParallaxSection>

        {/* Section 3: Unearth Ancient Tomes */}
        <ParallaxSection>
          <ParallaxLayer depth={-1.5}>
              <Image src="https://placehold.co/1200x800.png" alt="Magical Library" fill className="object-cover opacity-20" data-ai-hint="fantasy library scrolls" />
          </ParallaxLayer>
           <div className="relative z-10 text-center max-w-4xl mx-auto p-4">
              <h2 className="text-4xl md:text-6xl font-headline text-accent mb-4">Where Every Chapter is a Quest.</h2>
              <p className="text-lg md:text-xl text-slate-300">Explore the Kingdoms of Math, Science, and History. Delve into ancient sagas and prove your wisdom in challenges crafted from the very pages of your books.</p>
           </div>
        </ParallaxSection>

        {/* Section 4: Heed the Call of the Guilds */}
        <ParallaxSection className="bg-gradient-to-t from-[#110E1B] to-[#1a1529]">
            <ParallaxLayer depth={-1}>
              <Image src="https://placehold.co/1200x800.png" alt="Guild Hall" fill className="object-cover opacity-10" data-ai-hint="fantasy guild hall" />
            </ParallaxLayer>
           <div className="relative z-10 text-center max-w-4xl mx-auto p-4">
              <h2 className="text-4xl md:text-6xl font-headline text-accent mb-4">Adventure Together.</h2>
              <p className="text-lg md:text-xl text-slate-300 mb-12">No hero walks alone. Join a guild, compete on the leaderboards, and embark on epic quests with fellow learners from around the world.</p>
              <MagicalButton asChild variant="secondary" className="px-12 py-6 text-lg">
                <Link href="/guilds">Visit the Guild Hall</Link>
              </MagicalButton>
           </div>
        </ParallaxSection>
      </ParallaxContainer>
    </div>
  );
}
