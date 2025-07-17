'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, Lightbulb } from 'lucide-react';
import type { QuestModule } from '@/lib/types';

export const questModule: Omit<QuestModule, 'createdAt' | 'componentPath'> = {
  id: "wisdom_and_morals_exploration",
  title: "The Academy of Life Lessons",
  subjects: ["english", "literature", "character_education"],
  description: "Explore the deeper meanings and moral lessons of the story, then share your wisdom with others!",
  questType: "mastery",
  difficulty: "advanced",
  trialId: "class6",
  sagaId: "english_bottle_of_dew",
  metadata: {
    description: "Explore the deeper meanings and moral lessons of the story, then share your wisdom with others!",
    estimatedTime: 20,
    xpReward: 150,
    itemRewards: ["wisdom_scroll", "teacher_badge", "moral_compass"],
    unlocks: ["story_creation_tools", "peer_teaching_mode"],
    unlockRequirements: ["understanding_mastery_challenge"],
  },
};

const morals = [
  {
    lesson: "Hard work brings lasting success",
    evidence: "Rama Natha became truly wealthy only after working on his plantation.",
    application: "In real life, success comes from consistent effort, not shortcuts.",
    question: "Can you think of a time when hard work helped you achieve something?",
  },
  {
    lesson: "Wise teachers use clever methods",
    evidence: "The sage tricked Rama Natha into working hard for his own good.",
    application: "Sometimes the best way to learn is through experience, not just being told.",
    question: "How do you think the sage felt when he saw Rama Natha working hard?",
  }
];

const MoralExplorationInterface = () => {
    const [reflections, setReflections] = useState<{ [key: string]: string }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleReflectionChange = (lesson: string, value: string) => {
        setReflections(prev => ({ ...prev, [lesson]: value }));
    };

    const handleSubmit = () => {
        setIsSubmitted(true);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Explore the Moral Lessons</CardTitle>
                <CardDescription>Discover the important life lessons hidden in this beautiful story and reflect on them.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Accordion type="single" collapsible className="w-full">
                    {morals.map((moral, index) => (
                        <AccordionItem value={`item-${index}`} key={index}>
                            <AccordionTrigger>{moral.lesson}</AccordionTrigger>
                            <AccordionContent className="space-y-4">
                                <Alert>
                                    <Lightbulb className="h-4 w-4" />
                                    <AlertTitle>Evidence from the Story</AlertTitle>
                                    <AlertDescription>{moral.evidence}</AlertDescription>
                                </Alert>
                                <p><strong>Real-world Application:</strong> {moral.application}</p>
                                <div>
                                    <Label htmlFor={`reflection-${index}`} className="font-bold">{moral.question}</Label>
                                    <Textarea
                                        id={`reflection-${index}`}
                                        placeholder="Write your thoughts here..."
                                        value={reflections[moral.lesson] || ''}
                                        onChange={(e) => handleReflectionChange(moral.lesson, e.target.value)}
                                        className="mt-2"
                                        disabled={isSubmitted}
                                    />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                 <Button onClick={handleSubmit} disabled={isSubmitted}>
                    {isSubmitted ? <><Check className="mr-2" />Reflections Saved</> : "Save Reflections"}
                </Button>
                 {isSubmitted && (
                    <Alert variant="default" className="border-green-500 text-green-400">
                        <Check className="h-4 w-4" />
                        <AlertTitle>Wisdom Gained!</AlertTitle>
                        <AlertDescription>Your reflections have been recorded in your journal.</AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    )
}


export default function WisdomAndMoralsExplorationPage() {
    return (
        <div>
            <MoralExplorationInterface />
        </div>
    )
}
