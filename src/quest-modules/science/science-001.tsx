// src/quest-modules/science/science-001.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, FlaskConical } from 'lucide-react';
import type { QuestModule } from '@/lib/types';

// Exported metadata for the Drop-and-Go system
export const questModule: Omit<QuestModule, 'createdAt' | 'componentPath'> = {
  id: 'science-001',
  title: "Alchemist's Apprentice: Potion Brewing",
  trialId: 'trial-6',
  kingdomId: 'science',
  sagaId: 'chemistry-basics',
  subjects: ['science', 'chemistry'],
  difficulty: 'beginner',
  questType: 'experiment',
  metadata: {
    description: 'Learn the basics of chemical reactions by brewing a simple healing potion.',
    estimatedTime: 20,
    xpReward: 150,
    itemRewards: ['health_potion'],
  },
};

const quizQuestions = [
    {
        question: "What is the result of mixing a strong acid and a strong base?",
        options: ["A bigger acid", "A neutral solution (salt and water)", "An explosion", "They don't mix"],
        correctAnswer: "A neutral solution (salt and water)",
    },
];

const AlchemistApprenticeQuest = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const currentQuestion = quizQuestions[currentQuestionIndex];

    const handleSubmit = () => {
        if (!selectedAnswer) return;
        
        setIsAnswered(true);
        if (selectedAnswer === currentQuestion.correctAnswer) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };
    
    const getOptionClass = (option: string) => {
        if (!isAnswered) return '';
        if (option === currentQuestion.correctAnswer) return 'text-green-300';
        if (option === selectedAnswer && !isCorrect) return 'text-red-300';
        return '';
    }

    return (
        <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
                <CardTitle className="font-headline text-accent flex items-center gap-2">
                    <FlaskConical />
                    The Alchemist's Test
                </CardTitle>
                <CardDescription>
                    The master alchemist requires you to prove your basic knowledge. Answer the question correctly to proceed.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
                    <RadioGroup 
                        value={selectedAnswer ?? ''} 
                        onValueChange={setSelectedAnswer}
                        disabled={isAnswered}
                    >
                        {currentQuestion.options.map((option, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <RadioGroupItem value={option} id={`option-${index}`} />
                                <Label htmlFor={`option-${index}`} className={`text-base ${getOptionClass(option)}`}>
                                    {option}
                                </Label>
                            </div>
                        ))}
                    </RadioGroup>
                </div>

                {!isAnswered && (
                    <Button onClick={handleSubmit} disabled={!selectedAnswer}>
                        Confirm Answer
                    </Button>
                )}
                
                {isCorrect === true && (
                    <div className="flex items-center gap-2 p-3 rounded-md bg-green-500/20 text-green-300 border border-green-500/30">
                        <CheckCircle />
                        <p>Excellent! The Master Alchemist is impressed with your knowledge.</p>
                    </div>
                )}
                {isCorrect === false && (
                    <div className="flex items-center gap-2 p-3 rounded-md bg-red-500/20 text-red-300 border border-red-500/30">
                        <XCircle />
                        <p>Incorrect. That combination would yield a different result. The correct answer is highlighted.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default AlchemistApprenticeQuest;
