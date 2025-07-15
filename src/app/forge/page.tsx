// src/app/forge/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Lightbulb, Loader2, Sparkles, BookCheck, Swords, Puzzle } from 'lucide-react';
import type { GeneratedQuest } from '@/ai/flows/quest-generation-flow';
import { generateQuest } from '@/ai/flows/quest-generation-flow';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const activityIcons: Record<string, React.ElementType> = {
  'multiple_choice': BookCheck,
  'role_playing': Swords,
  'problem_solving': Puzzle,
};

export default function QuestForgePage() {
  const [learningObjective, setLearningObjective] = useState('');
  const [generatedQuest, setGeneratedQuest] = useState<GeneratedQuest | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateQuest = async () => {
    if (!learningObjective.trim()) {
      toast({ title: 'Please enter a learning objective.', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    setGeneratedQuest(null);
    try {
      const result = await generateQuest({ learningObjective });
      setGeneratedQuest(result);
    } catch (error) {
      console.error('Failed to generate quest:', error);
      toast({ title: 'Failed to generate quest. Please try again.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-[#110E1B] to-[#0D0C14] text-white p-4 sm:p-8 flex justify-center items-start overflow-auto">
       <Image
        src="https://placehold.co/1920x1080/000000/FFFFFF.png?text=+"
        alt="Forge background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-10"
        data-ai-hint="fantasy forge fire"
      />
      <main className="w-full max-w-3xl z-10 mt-10">
        <div className="text-center mb-10">
          <h1 className="font-headline text-5xl md:text-6xl font-bold text-mystic-gold drop-shadow-[0_4px_4px_rgba(0,0,0,0.7)]">
            Our PlayLearn Forge
          </h1>
          <p className="text-lg text-slate-300 mt-2">Your AI-powered educational game creator</p>
        </div>

        <Card className="bg-card/60 backdrop-blur-lg border border-primary/20 shadow-2xl shadow-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-accent font-headline">
              <Lightbulb />
              Describe your learning objective
            </CardTitle>
            <CardDescription>Enter a topic or a learning goal, and the AI will forge a quest for you.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full gap-4">
              <Textarea
                placeholder="e.g., 'Teach the basics of photosynthesis' or 'Practice identifying nouns and verbs'"
                value={learningObjective}
                onChange={(e) => setLearningObjective(e.target.value)}
                rows={4}
                className="bg-background/50"
              />
              <Button onClick={handleGenerateQuest} disabled={isLoading} size="lg">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Forging Quest...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-5 w-5" />
                    Generate Quest
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {generatedQuest && (
          <Card className="mt-8 bg-card/60 backdrop-blur-lg border border-primary/20 shadow-2xl shadow-primary/10 animate-in fade-in-50 duration-500">
            <CardHeader>
              <CardTitle className="text-3xl text-mystic-gold font-headline">{generatedQuest.title}</CardTitle>
              <CardDescription>{generatedQuest.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <h3 className="text-xl font-bold mb-4 text-accent font-headline">Activities</h3>
              <div className="space-y-6">
                {generatedQuest.activities.map((activity, index) => {
                  const Icon = activityIcons[activity.type] || Puzzle;
                  return (
                    <div key={index} className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                      <h4 className="flex items-center font-bold text-lg mb-2">
                        <Icon className="w-5 h-5 mr-3 text-accent" />
                        {activity.title}
                      </h4>
                      <p className="text-foreground/80 ml-8">{activity.description}</p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
