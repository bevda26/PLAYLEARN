'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, XCircle, GripVertical } from 'lucide-react';
import type { QuestModule } from '@/lib/types';

export const questModule: Omit<QuestModule, 'createdAt' | 'componentPath'> = {
  id: "understanding_mastery_challenge",
  title: "The Great Comprehension Challenge",
  subjects: ["english", "literature"],
  description: "Test your understanding of the story through exciting challenges and prove your mastery!",
  questType: "challenge",
  difficulty: "intermediate",
  trialId: "class6",
  sagaId: "english_bottle_of_dew",
  metadata: {
    description: "Test your understanding of the story through exciting challenges and prove your mastery!",
    estimatedTime: 15,
    xpReward: 125,
    itemRewards: ["comprehension_crown", "insight_gem", "analysis_armor"],
    unlocks: ["advanced_questioning", "moral_exploration"],
    unlockRequirements: ["rama_natha_story_journey"],
  },
};

const correctOrder = [
  "Rama Natha inherits land but doesn't work on it",
  "Rama Natha meets the sage Mahipati",
  "The sage asks for 5 liters of dew to make the magic potion",
  "Rama Natha starts planting banana trees and collecting dew",
  "The sage explains there is no magic potion",
  "Rama Natha and his wife become wealthy from the banana plantation"
];

// Fisher-Yates shuffle algorithm
const shuffleArray = (array: string[]) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const SequenceOrderingGame = () => {
  const [events, setEvents] = useState<string[]>([]);
  const [result, setResult] = useState<boolean | null>(null);

  useEffect(() => {
    setEvents(shuffleArray([...correctOrder]));
  }, []);

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.dataTransfer.setData("itemIndex", index.toString());
  };

  const handleDrop = (e: React.DragEvent<HTMLLIElement>, dropIndex: number) => {
    const dragIndex = parseInt(e.dataTransfer.getData("itemIndex"));
    const newEvents = [...events];
    const [draggedItem] = newEvents.splice(dragIndex, 1);
    newEvents.splice(dropIndex, 0, draggedItem);
    setEvents(newEvents);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
      e.preventDefault();
  }

  const checkOrder = () => {
    const isCorrect = events.every((event, index) => event === correctOrder[index]);
    setResult(isCorrect);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sequence the Story</CardTitle>
        <CardDescription>Drag and drop the events into the correct chronological order.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {events.map((event, index) => (
            <li
              key={event}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDrop={(e) => handleDrop(e, index)}
              onDragOver={handleDragOver}
              className="flex items-center gap-2 p-3 rounded-md bg-primary/10 border border-primary/20 cursor-grab active:cursor-grabbing"
            >
              <GripVertical className="text-muted-foreground" />
              <span>{event}</span>
            </li>
          ))}
        </ul>
        <Button onClick={checkOrder} disabled={result !== null}>Check Order</Button>
        {result === true && (
          <Alert variant="default" className="border-green-500 text-green-400">
            <Check className="h-4 w-4" />
            <AlertTitle>Correct!</AlertTitle>
            <AlertDescription>Perfect! You understand the story sequence completely!</AlertDescription>
          </Alert>
        )}
        {result === false && (
          <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Not Quite!</AlertTitle>
            <AlertDescription>Think about what happened first, then what followed. Try again!</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};


export default function UnderstandingMasteryChallengePage() {
    return (
        <div>
            <SequenceOrderingGame />
        </div>
    )
}
