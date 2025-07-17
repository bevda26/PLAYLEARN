'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, XCircle } from 'lucide-react';
import type { QuestModule } from '@/lib/types';

export const questModule: Omit<QuestModule, 'createdAt' | 'componentPath'> = {
  id: "rama_natha_story_journey",
  title: "Rama Natha's Magical Journey",
  subjects: ["english", "literature"],
  description: "Follow Rama Natha through his fascinating journey from seeking magic to discovering the power of hard work.",
  questType: "investigation",
  difficulty: "beginner",
  trialId: "class6",
  sagaId: "english_bottle_of_dew",
  metadata: {
    description: "Follow Rama Natha through his fascinating journey from seeking magic to discovering the power of hard work.",
    estimatedTime: 20,
    xpReward: 100,
    itemRewards: ["story_map", "character_medallion", "wisdom_crystal"],
    unlocks: ["character_analysis_tools", "plot_diagram"],
    unlockRequirements: ["vocabulary_exploration_adventure"],
  },
};

const storySegments = [
  {
    title: "The Beginning - Rama Natha's Dream",
    text: "Rama Natha was the son of a rich landlord. His father left him large tracts of land when he died. But Rama Natha did not spend even one day looking after his land. This was because he had a funny idea—he believed there was a magic potion that could turn any object into gold.",
    question: "Why didn't Rama Natha take care of his land?",
    options: ["He was too lazy", "He believed in finding a magic potion", "He didn't know how to farm", "He wanted to sell the land"],
    correctAnswer: "He believed in finding a magic potion",
  },
  {
    title: "The Meeting - A Wise Sage Appears",
    text: "One day, a famous sage called Mahipati came to their town. Rama Natha became his follower and asked him about the potion. To his surprise the sage answered, 'Yes, in my travels in the Himalayas, I heard how you could make such a potion. But it is difficult.'",
    question: "How did Rama Natha feel when the sage said he knew about the potion?",
    options: ["disappointed", "surprised and excited", "angry", "confused"],
    correctAnswer: "surprised and excited",
  },
];

const InteractiveStoryReader = () => {
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [results, setResults] = useState<{[key: number]: boolean}>({});

  const segment = storySegments[currentSegmentIndex];

  const handleAnswerChange = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentSegmentIndex]: value }));
  };

  const checkAnswer = () => {
    const isCorrect = answers[currentSegmentIndex] === segment.correctAnswer;
    setResults(prev => ({ ...prev, [currentSegmentIndex]: isCorrect }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{segment.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground/80">{segment.text}</p>
        <div className="p-4 border-l-4 border-primary/50 bg-primary/10 rounded-r-lg space-y-3">
          <h4 className="font-bold">{segment.question}</h4>
          <RadioGroup value={answers[currentSegmentIndex]} onValueChange={handleAnswerChange} disabled={results[currentSegmentIndex] !== undefined}>
            {segment.options.map(option => (
              <div className="flex items-center space-x-2" key={option}>
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
          <Button onClick={checkAnswer} disabled={!answers[currentSegmentIndex] || results[currentSegmentIndex] !== undefined}>Check</Button>
          {results[currentSegmentIndex] === true && (
            <Alert variant="default" className="border-green-500 text-green-400">
              <Check className="h-4 w-4" />
              <AlertTitle>Correct!</AlertTitle>
              <AlertDescription>Wonderful! You're following the story perfectly!</AlertDescription>
            </Alert>
          )}
          {results[currentSegmentIndex] === false && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Not Quite!</AlertTitle>
              <AlertDescription>Think about what the character is feeling and try again!</AlertDescription>
            </Alert>
          )}
        </div>
        <div className="flex justify-between">
          <Button onClick={() => setCurrentSegmentIndex(i => i - 1)} disabled={currentSegmentIndex === 0}>Previous</Button>
          <Button onClick={() => setCurrentSegmentIndex(i => i + 1)} disabled={currentSegmentIndex === storySegments.length - 1}>Next</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function RamaNathaStoryJourneyPage() {
    return (
        <div>
            <InteractiveStoryReader />
        </div>
    )
}
