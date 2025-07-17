// src/quest-modules/math/math-001.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CheckCircle, XCircle } from 'lucide-react';
import type { QuestModule } from '@/lib/types';

// Exported metadata for the Drop-and-Go system
export const questModule: Omit<QuestModule, 'createdAt' | 'componentPath'> = {
  id: 'math-001',
  title: "The Dragon's Hoard: Counting Gold",
  trialId: 'trial-6', // Added for new structure
  kingdomId: 'math',
  sagaId: 'arithmetic-basics', // Added for new structure
  difficulty: 'beginner',
  questType: 'challenge',
  metadata: {
    description: 'The great dragon sleeps! Help the villagers count its vast treasure before it awakes.',
    estimatedTime: 15,
    xpReward: 100,
    itemRewards: ['health_potion'],
  },
};


const DragonHoardQuest = () => {
    const [answer, setAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const goldPiles = [12, 7, 21, 5];
    const correctAnswer = goldPiles.reduce((sum, current) => sum + current, 0);

    const checkAnswer = () => {
        const userAnswer = parseInt(answer, 10);
        if (userAnswer === correctAnswer) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    return (
        <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle className="font-headline text-accent">Count the Dragon's Hoard!</CardTitle>
                <CardDescription>
                    The dragon is asleep! Add up all the piles of gold coins to determine the total size of its hoard.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-around items-center p-4 bg-background/50 rounded-lg">
                    {goldPiles.map((pile, index) => (
                        <div key={index} className="text-center">
                            <span className="text-4xl font-bold text-mystic-gold drop-shadow-lg">💰</span>
                            <p className="font-bold text-xl">{pile}</p>
                        </div>
                    ))}
                </div>
                
                <div className="flex items-center gap-4">
                    <Input 
                        type="number"
                        placeholder="Enter total gold..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="text-lg"
                    />
                    <Button onClick={checkAnswer}>Check Answer</Button>
                </div>
                
                {isCorrect === true && (
                    <div className="flex items-center gap-2 p-3 rounded-md bg-green-500/20 text-green-300">
                        <CheckCircle />
                        <p>Correct! You've counted the treasure successfully!</p>
                    </div>
                )}
                {isCorrect === false && (
                    <div className="flex items-center gap-2 p-3 rounded-md bg-red-500/20 text-red-300">
                        <XCircle />
                        <p>Not quite. The dragon stirs! Try again.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default DragonHoardQuest;
