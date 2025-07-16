// src-quest-modules/math/math-002.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import type { QuestModule } from '@/lib/types';

// Exported metadata for the Drop-and-Go system
export const questModule: Omit<QuestModule, 'createdAt' | 'componentPath'> = {
  id: 'math-002',
  title: "Geomancer's Riddle: Shapes of Power",
  subject: 'math',
  difficulty: 'intermediate',
  questType: 'investigation',
  metadata: {
    description: 'Unlock the secrets of the Geomancer by identifying powerful geometric shapes in the ancient ruins.',
    estimatedTime: 25,
    xpReward: 250,
    itemRewards: ['scroll_of_wisdom'],
    unlockRequirements: ['math-001'],
  },
};

const GeomancerRiddleQuest = () => {
    const [answer, setAnswer] = useState<string>('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const correctAnswer = 'hexagon';

    const checkAnswer = () => {
        setIsCorrect(answer.toLowerCase() === correctAnswer);
    };

    return (
        <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle className="font-headline text-accent">The Geomancer's Riddle</CardTitle>
                <CardDescription>
                    "I have six sides and six angles, a shape beloved by bees. What am I?" - The Geomancer
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-4 bg-background/50 rounded-lg text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-24 h-24 mx-auto fill-accent stroke-primary" strokeWidth="3">
                        <polygon points="50 5, 95 27.5, 95 72.5, 50 95, 5 72.5, 5 27.5" />
                    </svg>
                </div>
                
                <RadioGroup value={answer} onValueChange={setAnswer}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="square" id="r1" />
                        <Label htmlFor="r1">Square</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="triangle" id="r2" />
                        <Label htmlFor="r2">Triangle</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="hexagon" id="r3" />
                        <Label htmlFor="r3">Hexagon</Label>
                    </div>
                     <div className="flex items-center space-x-2">
                        <RadioGroupItem value="pentagon" id="r4" />
                        <Label htmlFor="r4">Pentagon</Label>
                    </div>
                </RadioGroup>

                <Button onClick={checkAnswer} disabled={!answer}>Submit Answer</Button>
                
                {isCorrect === true && (
                    <div className="flex items-center gap-2 p-3 rounded-md bg-green-500/20 text-green-300">
                        <CheckCircle />
                        <p>Correct! You've solved the riddle and harnessed the shape's power!</p>
                    </div>
                )}
                {isCorrect === false && (
                    <div className="flex items-center gap-2 p-3 rounded-md bg-red-500/20 text-red-300">
                        <XCircle />
                        <p>Not quite. The runes dim. The shape's power remains elusive.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default GeomancerRiddleQuest;
