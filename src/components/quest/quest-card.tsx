import Link from 'next/link';
import { Star, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';


interface QuestCardProps {
  id: string;
  subject: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questType: string;
  xpReward: number;
  isRecommended?: boolean;
}

export function QuestCard({
  id,
  subject,
  title,
  difficulty,
  questType,
  xpReward,
  isRecommended = false,
}: QuestCardProps) {
  const difficultyConfig = {
    beginner: {
      className: 'from-green-500/70 to-emerald-600/70 border-green-400',
      label: 'Beginner',
    },
    intermediate: {
      className: 'from-yellow-500/70 to-orange-500/70 border-yellow-400',
      label: 'Intermediate',
    },
    advanced: {
      className: 'from-red-500/70 to-purple-600/70 border-red-400',
      label: 'Advanced',
    },
  };
  
  const config = difficultyConfig[difficulty];

  return (
    <Link href={`/${subject}/${id}`} className="group">
      <div
        className={cn(`
          relative p-5 rounded-xl cursor-pointer transform transition-all duration-300
          hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between
          bg-gradient-to-br from-card/80 to-card/60
          border-2 border-primary/20
          shadow-lg backdrop-blur-sm
          hover:border-accent
        `, isRecommended && 'border-mystic-gold ring-2 ring-mystic-gold/50')}
      >
        {isRecommended && (
          <div className="absolute -top-3 right-4 px-3 py-1 text-xs rounded-full bg-mystic-gold text-shadow-black font-bold shadow-lg">
            <Star className="w-4 h-4 inline-block -mt-1 mr-1" />
            Recommended
          </div>
        )}
        
        <div className="relative z-10">
          <p className="text-xs text-accent uppercase tracking-widest font-semibold">
            {questType} Quest
          </p>
          <h3 className="text-xl font-headline font-bold text-parchment-white my-2 group-hover:text-mystic-gold transition-colors">
            {title}
          </h3>
        </div>

        <div className="relative z-10 flex justify-between items-center mt-4">
          <span className={`capitalize py-1 px-3 rounded-full bg-black/40 text-xs border border-white/20 ${config.label === 'Beginner' ? 'text-green-300' : config.label === 'Intermediate' ? 'text-yellow-300' : 'text-red-300'}`}>
            {difficulty}
          </span>
          <div className="flex items-center gap-1 font-bold text-mystic-gold">
            <Zap size={16} />
            <span>{xpReward} XP</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
