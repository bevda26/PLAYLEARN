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
  subject: string;
  title: string;
  icon: keyof typeof icons;
  questCount: number;
}

export const KingdomPortal: FC<KingdomPortalProps> = ({
  subject,
  title,
  icon,
  questCount,
}) => {
  const Icon = icons[icon];

  return (
    <Link href={`/${subject}`} className="group w-full">
      <Card className="relative overflow-hidden h-full bg-card/50 backdrop-blur-sm border-2 border-accent/30 hover:border-accent transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20 flex flex-col justify-center items-center p-6">
        
        {/* Particle Effect */}
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
        
        <div className="relative z-10 p-4 bg-primary/20 rounded-full border-2 border-primary/50 mb-4 group-hover:scale-110 group-hover:bg-primary/40 transition-all duration-300">
          <Icon className="h-10 w-10 text-accent" />
        </div>
        <CardHeader className="p-0 text-center relative z-10">
          <CardTitle className="font-headline text-xl text-foreground group-hover:text-accent transition-colors duration-300">
            {title}
          </CardTitle>
        </CardHeader>
        {questCount > 0 && (
          <CardContent className="p-0 mt-2 text-center relative z-10">
            <p className="text-sm text-foreground/80">{questCount} Quests Await</p>
          </CardContent>
        )}
      </Card>
    </Link>
  );
};
