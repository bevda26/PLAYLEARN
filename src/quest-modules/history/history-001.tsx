// src/quest-modules/history/history-001.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import type { QuestModule } from '@/lib/types';

export const questModule: Omit<QuestModule, 'createdAt' | 'componentPath'> = {
  id: 'history-001',
  title: 'Echoes of the Ancients',
  trialId: 'trial-6',
  kingdomId: 'history',
  sagaId: 'ancient-civilizations',
  difficulty: 'beginner',
  questType: 'investigation',
  metadata: {
    description: 'A scroll from the Whispering Tombs has a simple question. Answer it to prove your knowledge of the past.',
    estimatedTime: 10,
    xpReward: 120,
    itemRewards: ['scroll_of_wisdom'],
  },
};

const HistoryQuest = () => {
    const [answer, setAnswer] = useState<string>('');
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const correctAnswer = 'The Pyramids of Giza';

    const checkAnswer = () => {
        setIsCorrect(answer === correctAnswer);
    };

    return (
        <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle className="font-headline text-accent">A Question from the Scribe</CardTitle>
                <CardDescription>
                   "Which ancient wonder was built as a tomb for pharaohs?"
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <RadioGroup value={answer} onValueChange={setAnswer}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="The Colosseum" id="r1" />
                        <Label htmlFor="r1">The Colosseum</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="The Great Wall of China" id="r2" />
                        <Label htmlFor="r2">The Great Wall of China</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="The Pyramids of Giza" id="r3" />
                        <Label htmlFor="r3">The Pyramids of Giza</Label>
                    </div>
                </RadioGroup>
                
                <Button onClick={checkAnswer} disabled={!answer}>Check Answer</Button>
                
                {isCorrect === true && (
                    <div className="flex items-center gap-2 p-3 rounded-md bg-green-500/20 text-green-300">
                        <CheckCircle />
                        <p>Correct! The echoes of the past are clear to you.</p>
                    </div>
                )}
                {isCorrect === false && (
                    <div className="flex items-center gap-2 p-3 rounded-md bg-red-500/20 text-red-300">
                        <XCircle />
                        <p>Not quite. That structure was built for a different purpose.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default HistoryQuest;
