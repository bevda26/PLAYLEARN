'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Check, Lightbulb } from 'lucide-react';
import type { QuestModule } from '@/lib/types';

export const questModule: Omit<QuestModule, 'createdAt' | 'componentPath'> = {
  id: "creative_storytelling_challenge",
  title: "The Epic Tale Creation Challenge",
  subjects: ["english", "creative_writing", "literature"],
  description: "Face the ultimate challenge: create your own story inspired by 'A Bottle of Dew' and demonstrate complete mastery!",
  questType: "boss",
  difficulty: "advanced",
  trialId: "class6",
  sagaId: "english_bottle_of_dew",
  metadata: {
    description: "Face the ultimate challenge: create your own story inspired by 'A Bottle of Dew' and demonstrate complete mastery!",
    estimatedTime: 30,
    xpReward: 200,
    itemRewards: ["master_storyteller_crown", "creative_quill", "imagination_crystal", "chapter_completion_certificate"],
    unlocks: ["next_chapter_portal", "advanced_literature_kingdom", "creative_writing_studio"],
  },
};

const CreativeStoryBuilder = () => {
  const [stage, setStage] = useState('planning'); // planning, writing, sharing
  const [storyPlan, setStoryPlan] = useState({ character: '', setting: '', moral: '' });
  const [storyContent, setStoryContent] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoryPlan({ ...storyPlan, [e.target.name]: e.target.value });
  };

  const moveToWriting = () => {
    if (storyPlan.character && storyPlan.setting && storyPlan.moral) {
      setStage('writing');
    }
  };

  const moveToSharing = () => {
    if (storyContent) {
      setStage('sharing');
    }
  };
  
  const submitStory = () => {
    setIsSubmitted(true);
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Creative Story Builder</CardTitle>
          <CardDescription>Follow the stages to craft your own tale.</CardDescription>
        </CardHeader>
        <CardContent>
          {stage === 'planning' && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Planning Phase</h3>
              <p>Plan your story with characters, setting, and a moral lesson.</p>
              <Input name="character" placeholder="Main character with a problem" value={storyPlan.character} onChange={handlePlanChange} />
              <Input name="setting" placeholder="Engaging setting" value={storyPlan.setting} onChange={handlePlanChange} />
              <Input name="moral" placeholder="Clear moral lesson" value={storyPlan.moral} onChange={handlePlanChange} />
              <Button onClick={moveToWriting}>Move to Writing</Button>
            </div>
          )}

          {stage === 'writing' && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Writing Phase</h3>
              <p>Write your complete story with a beginning, middle, and end.</p>
              <Textarea placeholder="Once upon a time..." value={storyContent} onChange={(e) => setStoryContent(e.target.value)} rows={10} />
              <Button onClick={moveToSharing}>Move to Sharing</Button>
            </div>
          )}
          
          {stage === 'sharing' && !isSubmitted && (
            <div className="space-y-4">
              <h3 className="font-bold text-lg">Sharing Phase</h3>
              <p>You are ready to present your story. Once submitted, you cannot change it.</p>
               <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertTitle>Your Story:</AlertTitle>
                <AlertDescription className="prose prose-sm dark:prose-invert">
                    <p><strong>Character:</strong> {storyPlan.character}</p>
                    <p><strong>Setting:</strong> {storyPlan.setting}</p>
                    <p><strong>Moral:</strong> {storyPlan.moral}</p>
                    <hr className="my-2" />
                    <p>{storyContent}</p>
                </AlertDescription>
              </Alert>
              <Button onClick={submitStory}>Submit Your Masterpiece</Button>
            </div>
          )}

          {isSubmitted && (
             <Alert variant="default" className="border-green-500 text-green-400">
                <Check className="h-4 w-4" />
                <AlertTitle>Story Submitted!</AlertTitle>
                <AlertDescription>
                   Congratulations, Master Storyteller! You have completed the ultimate challenge.
                </AlertDescription>
              </Alert>
          )}

        </CardContent>
      </Card>
    </div>
  );
};


export default function CreativeExpressionBossQuestPage() {
    return (
        <div>
            <CreativeStoryBuilder />
        </div>
    )
}
