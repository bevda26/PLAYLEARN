'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, XCircle } from 'lucide-react';
import type { QuestModule } from '@/lib/types';

export const questModule: Omit<QuestModule, 'createdAt' | 'componentPath'> = {
  id: "vocabulary_exploration_adventure",
  title: "The Magical Vocabulary Quest",
  subjects: ["english", "language_arts"],
  description: "Begin your journey by discovering the magical vocabulary that will unlock the secrets of Rama Natha's story.",
  questType: "investigation",
  difficulty: "beginner",
  trialId: "class6",
  sagaId: "english_bottle_of_dew",
  metadata: {
    description: "Begin your journey by discovering the magical vocabulary that will unlock the secrets of Rama Natha's story.",
    estimatedTime: 10,
    xpReward: 75,
    itemRewards: ["vocabulary_scroll", "definition_gem", "language_compass"],
    unlocks: ["story_portal", "character_gallery"],
  },
};

const words = [
    {
      word: "plantation",
      options: ["a large farm where crops are grown", "a small garden", "a type of tree", "a magical potion"],
      correctAnswer: "a large farm where crops are grown",
    },
    {
      word: "sage",
      options: ["a young boy", "a wise and learned person", "a type of plant", "a magical creature"],
      correctAnswer: "a wise and learned person",
    },
    {
      word: "potion",
      options: ["a type of food", "a magical liquid with special powers", "a farming tool", "a place to live"],
      correctAnswer: "a magical liquid with special powers",
    },
    {
      word: "chant",
      options: ["to dance", "to sing or recite in a rhythmic way", "to work hard", "to sleep"],
      correctAnswer: "to sing or recite in a rhythmic way",
    }
];

const InteractiveMatchingGame = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [result, setResult] = useState<string | null>(null);
    const [correctCount, setCorrectCount] = useState(0);

    const currentWord = words[currentWordIndex];

    const handleSubmit = () => {
        if (!selectedAnswer) return;
        if (selectedAnswer === currentWord.correctAnswer) {
            setResult('correct');
            setCorrectCount(prev => prev + 1);
        } else {
            setResult('incorrect');
        }
    };

    const handleNext = () => {
        setResult(null);
        setSelectedAnswer(null);
        if (currentWordIndex < words.length - 1) {
            setCurrentWordIndex(prev => prev + 1);
        }
    }

    if(correctCount === words.length) {
        return (
             <Alert variant="default" className="border-green-500 text-green-400">
                <Check className="h-4 w-4" />
                <AlertTitle>Quest Complete!</AlertTitle>
                <AlertDescription>
                    Excellent! You've unlocked all the vocabulary and can proceed on your adventure.
                </AlertDescription>
            </Alert>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Define: <span className="text-accent">{currentWord.word}</span></CardTitle>
                <CardDescription>Match the magical word with its meaning to unlock the story portal!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <RadioGroup value={selectedAnswer ?? ''} onValueChange={setSelectedAnswer} disabled={!!result}>
                    {currentWord.options.map(option => (
                        <div className="flex items-center space-x-2" key={option}>
                            <RadioGroupItem value={option} id={option} />
                            <Label htmlFor={option}>{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
                
                {!result ? (
                    <Button onClick={handleSubmit} disabled={!selectedAnswer}>Check Answer</Button>
                ) : (
                    <Button onClick={handleNext}>Next Word</Button>
                )}

                {result === 'correct' && (
                    <Alert variant="default" className="border-green-500 text-green-400">
                        <Check className="h-4 w-4" />
                        <AlertTitle>Correct!</AlertTitle>
                        <AlertDescription>You've unlocked another piece of the vocabulary puzzle!</AlertDescription>
                    </Alert>
                )}
                {result === 'incorrect' && (
                     <Alert variant="destructive">
                        <XCircle className="h-4 w-4" />
                        <AlertTitle>Not Quite!</AlertTitle>
                        <AlertDescription>Every attempt makes you wiser! The correct answer was: {currentWord.correctAnswer}</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    )
}

export default function VocabularyExplorationAdventurePage() {
  return (
    <div>
        <InteractiveMatchingGame />
    </div>
  )
}
