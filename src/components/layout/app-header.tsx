import Link from 'next/link';
import { Crown, BookOpen, ToyBrick, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WizardsChamberIcon } from '@/components/icons/wizards-chamber';

export const AppHeader = () => {
  return (
    <header className="relative z-20 w-full p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center bg-black/20 backdrop-blur-md p-2 rounded-lg border border-primary/20">
        <Link href="/" className="flex items-center gap-2">
          <Crown className="w-8 h-8 text-mystic-gold" />
          <div className="flex flex-col items-start">
            <span className="font-headline text-xl font-bold text-white">PLAYLEARN</span>
            <span className="text-xs text-slate-400 -mt-1 tracking-widest">RPG LEARNING PLATFORM</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <Button variant="ghost" className="text-slate-300 hover:bg-primary/20 hover:text-white">
            <Shield className="w-4 h-4 mr-2"/>
            Throne Room
          </Button>
          <Button variant="ghost" className="text-slate-300 hover:bg-primary/20 hover:text-white">
            <BookOpen className="w-4 h-4 mr-2"/>
            Library Tower
          </Button>
          <Button variant="ghost" className="text-slate-300 hover:bg-primary/20 hover:text-white">
            <ToyBrick className="w-4 h-4 mr-2"/>
            Training Grounds
          </Button>
           <Button variant="ghost" className="text-slate-300 hover:bg-primary/20 hover:text-white">
            <User className="w-4 h-4 mr-2"/>
            Guild Hall
          </Button>
          <Button variant="ghost" className="text-slate-300 hover:bg-primary/20 hover:text-white">
            <WizardsChamberIcon className="w-4 h-4 mr-2"/>
            Wizards' Chamber
          </Button>
        </nav>
      </div>
    </header>
  );
};
