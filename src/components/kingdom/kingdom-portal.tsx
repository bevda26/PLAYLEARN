"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Swords, FlaskConical, BookOpen, Castle, type LucideIcon } from "lucide-react";
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
      <Card className="h-full bg-card/50 backdrop-blur-sm border-2 border-accent/30 hover:border-accent transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20 flex flex-col justify-center items-center p-6">
        <div className="p-4 bg-primary/20 rounded-full border-2 border-primary/50 mb-4 group-hover:scale-110 group-hover:bg-primary/40 transition-all duration-300">
          <Icon className="h-10 w-10 text-accent" />
        </div>
        <CardHeader className="p-0 text-center">
          <CardTitle className="font-headline text-xl text-parchment-white group-hover:text-accent transition-colors duration-300">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 mt-2 text-center">
          <p className="text-sm text-foreground/80">{questCount} Quests Await</p>
        </CardContent>
      </Card>
    </Link>
  );
};
