
'use client';

import { useState } from 'react';
import type { QuestModule } from '@/lib/types';
import { recommendQuests, type RecommendQuestsOutput } from '@/ai/flows/quest-recommendations';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Loader2 } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';

interface QuestRecommendationsProps {
  availableQuests: QuestModule[];
  onRecommendations: (recommendedIds: string[]) => void;
}

export function QuestRecommendations({ availableQuests, onRecommendations }: QuestRecommendationsProps) {
  const [learningGoals, setLearningGoals] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<RecommendQuestsOutput | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!learningGoals.trim()) {
      toast({
        title: 'Learning Goals Required',
        description: 'Please enter your learning goals to get recommendations.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setRecommendation(null);
    onRecommendations([]);

    try {
      // Format the quests for the AI prompt
      const questStrings = availableQuests.map(q => `${q.id}: ${q.title} - ${q.metadata.description}`);
      
      const result = await recommendQuests({
        learningGoals,
        moduleContent: 'Generic module content for all quests', // This could be more specific in a real implementation
        availableQuests: questStrings,
      });

      // The AI returns quest strings like "math-001: The Dragon's Hoard...". We need to extract just the ID part.
      const recommendedIds = result.recommendedQuests.map(q => q.split(':')[0].trim());
      
      setRecommendation(result);
      onRecommendations(recommendedIds);

      toast({
        title: 'Quests Recommended!',
        description: 'The AI has suggested quests based on your goals.',
      });
    } catch (error) {
      console.error('Error getting recommendations:', error);
      toast({
        title: 'Recommendation Error',
        description: 'Could not get quest recommendations at this time. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-accent/20">
      <CardHeader>
        <div className="flex items-center gap-4">
          <Lightbulb className="w-8 h-8 text-accent" />
          <div>
            <CardTitle className="font-headline text-2xl text-accent">AI Quest Advisor</CardTitle>
            <CardDescription className="text-foreground/80">
              Tell the advisor your learning goals to get personalized quest recommendations!
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="e.g., 'I want to understand basic algebra' or 'Improve my creative writing skills'"
            value={learningGoals}
            onChange={(e) => setLearningGoals(e.target.value)}
            rows={3}
            className="bg-background/50 border-primary/50"
          />
          <Button type="submit" disabled={isLoading || availableQuests.length === 0}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Advising...
              </>
            ) : (
              'Get Recommendations'
            )}
          </Button>
        </form>

        {isLoading && (
            <div className='mt-6 space-y-4'>
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
            </div>
        )}

        {recommendation && (
          <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/30">
            <h4 className="font-bold text-lg text-accent mb-2">Advisor's Insight:</h4>
            <p className="text-foreground/90 whitespace-pre-wrap">{recommendation.reasoning}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

    