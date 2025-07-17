import Link from 'next/link';
import { Star, Zap, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';


interface QuestCardProps {
  id: string;
  subjects: string[];
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  questType: string;
  xpReward: number;
  isRecommended?: boolean;
  isLocked?: boolean;
  routeParams: { trialId: string; kingdomId: string; sagaId: string; questId: string; }
}

export function QuestCard({
  id,
  subjects,
  title,
  difficulty,
  questType,
  xpReward,
  isRecommended = false,
  isLocked = false,
  routeParams,
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

  const cardContent = (
    <div
      className={cn(`
        relative p-5 rounded-xl cursor-pointer transform transition-all duration-300
        h-full flex flex-col justify-between
        bg-gradient-to-br from-card/80 to-card/60
        border-2 border-primary/20
        shadow-lg backdrop-blur-sm
      `, 
      isRecommended && 'border-accent ring-2 ring-accent/50',
      isLocked 
        ? 'opacity-50 cursor-not-allowed' 
        : 'hover:scale-105 hover:shadow-2xl hover:border-accent'
      )}
    >
      {isRecommended && !isLocked && (
        <div className="absolute -top-3 right-4 px-3 py-1 text-xs rounded-full bg-accent text-accent-foreground font-bold shadow-lg">
          <Star className="w-4 h-4 inline-block -mt-1 mr-1" />
          Recommended
        </div>
      )}
      
      <div className="relative z-10">
        <p className="text-xs text-accent uppercase tracking-widest font-semibold">
          {questType} Quest
        </p>
        <h3 className={cn("text-xl font-headline font-bold text-foreground my-2 transition-colors", !isLocked && "group-hover:text-accent")}>
          {title}
        </h3>
      </div>

      <div className="relative z-10 flex justify-between items-center mt-4">
        <span className={`capitalize py-1 px-3 rounded-full bg-black/40 text-xs border border-white/20 ${config.label === 'Beginner' ? 'text-green-300' : config.label === 'Intermediate' ? 'text-yellow-300' : 'text-red-300'}`}>
          {difficulty}
        </span>
        <div className="flex items-center gap-1 font-bold text-accent">
          {isLocked ? <Lock size={16} /> : <Zap size={16} />}
          <span>{xpReward} XP</span>
        </div>
      </div>
    </div>
  );

  if (isLocked) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="group">{cardContent}</div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Complete previous quests to unlock this challenge.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  const { trialId, kingdomId, sagaId, questId } = routeParams;
  const href = `/quest-kingdom/${trialId}/${kingdomId}/${sagaId}/${questId}`;

  return (
    <Link href={href} className="group">
      {cardContent}
    </Link>
  );
}
