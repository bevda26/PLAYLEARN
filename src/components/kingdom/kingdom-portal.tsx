// src/components/kingdom/kingdom-portal.tsx
"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Swords, FlaskConical, BookOpen, Castle, type LucideIcon, Sparkles } from "lucide-react";
import type { FC } from "react";

const icons: Record<string, LucideIcon> = {
  swords: Swords,
  "flask-conical": FlaskConical,
  "book-open": BookOpen,
  castle: Castle,
};

interface KingdomPortalProps {
  trialId: string;
  kingdomId: string;
  title: string;
  icon: keyof typeof icons;
  questCount: number;
}

export const KingdomPortal: FC<KingdomPortalProps> = ({
  trialId,
  kingdomId,
  title,
  icon,
  questCount,
}) => {
  const Icon = icons[icon] || Castle;
  const isLocked = questCount === 0;

  const cardContent = (
      <Card className={`relative overflow-hidden h-full bg-card/50 backdrop-blur-sm border-2  transition-all duration-300 flex flex-col justify-center items-center p-6 ${isLocked ? 'border-dashed border-muted-foreground/50 opacity-60' : 'border-accent/30 group-hover:border-accent group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-accent/20'}`}>
        
        {!isLocked && (
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <Sparkles 
                        key={i}
                        className="absolute text-accent/50 animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${Math.random() * 8 + 4}px`,
                            height: `${Math.random() * 8 + 4}px`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${Math.random() * 3 + 2}s`
                        }}
                    />
                ))}
            </div>
        )}
        
        <div className={`relative z-10 p-4 rounded-full border-2  mb-4 transition-all duration-300 ${isLocked ? 'bg-muted/20 border-muted-foreground/30' : 'bg-primary/20 border-primary/50 group-hover:scale-110 group-hover:bg-primary/40'}`}>
          <Icon className={`h-10 w-10 ${isLocked ? 'text-muted-foreground' : 'text-accent'}`} />
        </div>
        <CardHeader className="p-0 text-center relative z-10">
          <CardTitle className={`font-headline text-xl text-foreground transition-colors duration-300 ${!isLocked && 'group-hover:text-accent'}`}>
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 mt-2 text-center relative z-10">
            {isLocked ? (
                 <p className="text-sm text-muted-foreground">Coming Soon</p>
            ) : (
                <p className="text-sm text-foreground/80">{questCount} Quests Await</p>
            )}
        </CardContent>
      </Card>
  );

  if (isLocked) {
      return <div className="group w-full cursor-not-allowed">{cardContent}</div>;
  }

  return (
    <Link href={`/quest-kingdom/${trialId}/${kingdomId}`} className="group w-full">
      {cardContent}
    </Link>
  );
};
