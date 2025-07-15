import Link from 'next/link';

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
  const difficultyColors = {
    beginner: 'from-forest-green/70 to-emerald-600/70',
    intermediate: 'from-yellow-500/70 to-orange-600/70',
    advanced: 'from-dragon-red/70 to-royal-purple/70',
  };

  return (
    <Link href={`/${subject}/${id}`}>
      <div
        className={`
          relative p-6 rounded-xl cursor-pointer transform transition-all duration-300
          hover:scale-105 hover:shadow-2xl
          bg-gradient-to-br ${difficultyColors[difficulty]}
          border-2 ${isRecommended ? 'border-mystic-gold animate-pulse' : 'border-accent/20'}
          shadow-lg backdrop-blur-sm
          before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br
          before:from-white/10 before:to-transparent before:opacity-0
          hover:before:opacity-100 before:transition-opacity
        `}
      >
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-2">
            <p className="text-xs text-white/80 uppercase tracking-wide">
              {questType} Quest
            </p>
            {isRecommended && (
              <div className="px-2 py-0.5 text-xs rounded-full bg-mystic-gold text-shadow-black font-bold">
                Recommended
              </div>
            )}
          </div>
          <h3 className="text-xl font-headline font-bold text-parchment-white mb-4">
            {title}
          </h3>
          <div className="flex justify-between items-center text-sm text-mystic-gold">
            <span className="capitalize py-1 px-3 rounded-full bg-black/30 text-xs">
              {difficulty}
            </span>
            <span>{xpReward} XP</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
