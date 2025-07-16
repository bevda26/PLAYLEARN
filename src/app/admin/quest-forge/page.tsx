
// src/app/admin/quest-forge/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Hammer, Loader2, Wand2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import type { QuestModule } from '@/lib/types';
import { registerQuestModule } from '@/lib/auto-integration/route-generator';
import Link from 'next/link';

export default function QuestForgePage() {
  const [formData, setFormData] = useState<Omit<QuestModule, 'createdAt'>>({
    id: 'science-002',
    title: "Stargazer's Prophecy: Celestial Motion",
    subject: 'science',
    difficulty: 'intermediate',
    questType: 'investigation',
    componentPath: 'science/science-002.tsx',
    metadata: {
      description: 'Chart the paths of the constellations to decipher the Stargazer\'s ancient prophecy.',
      estimatedTime: 30,
      xpReward: 300,
      itemRewards: ['scroll_of_wisdom'],
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name in formData.metadata!) {
      let parsedValue: any = value;
        if (name === 'estimatedTime' || name === 'xpReward') {
            parsedValue = parseInt(value) || 0;
        } else if (name === 'itemRewards') {
            parsedValue = value.split(',').map(s => s.trim()).filter(Boolean);
        }
      setFormData(prev => ({
        ...prev,
        metadata: { ...prev.metadata!, [name]: parsedValue },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value as any }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Basic validation
      if (!formData.id || !formData.title || !formData.componentPath) {
        throw new Error("ID, Title, and Component Path are required.");
      }
      await registerQuestModule(formData);
      toast({ title: 'Quest Registered!', description: `Quest "${formData.title}" has been added to the chronicles.` });
    } catch (error: any) {
      console.error('Failed to register quest:', error);
      toast({ title: 'Failed to register quest.', description: error.message, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };
  
  const submitButtonContent = isLoading ? (
    <>
      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      Registering...
    </>
  ) : (
    <>
      <Hammer className="mr-2 h-5 w-5" />
      Register Quest
    </>
  );

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-background to-background/80 text-foreground p-4 sm:p-8 flex justify-center items-start overflow-auto">
       <Image
        src="https://placehold.co/1920x1080/000000/FFFFFF.png?text=+"
        alt="Forge background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-10"
        data-ai-hint="fantasy forge fire"
      />
      <main className="w-full max-w-3xl z-10 mt-10">
        <Link href="/admin/quest-builder" className="flex items-center gap-2 text-accent hover:underline mb-8">
            <ArrowLeft size={16} />
            Back to Quest Builder
        </Link>
        <div className="text-center mb-10">
          <h1 className="font-headline text-5xl md:text-6xl font-bold text-accent drop-shadow-[0_4px_4px_rgba(0,0,0,0.7)]">
            PlayLearn Forge
          </h1>
          <p className="text-lg text-slate-300 mt-2">Manually register new quest modules into the system.</p>
        </div>

        <Card className="bg-card/60 backdrop-blur-lg border border-primary/20 shadow-2xl shadow-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-accent font-headline">
              <Wand2 />
              Register New Quest Module
            </CardTitle>
            <CardDescription>Enter the details for a new quest. This will create a new entry in the 'quest-modules' collection.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="id">Quest ID</Label>
                  <Input id="id" name="id" placeholder="e.g., math-004" value={formData.id} onChange={handleInputChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Quest Title</Label>
                  <Input id="title" name="title" placeholder="The Alchemist's Riddle" value={formData.title} onChange={handleInputChange} required />
                </div>
              </div>
              
              <div className="space-y-2">
                  <Label htmlFor="componentPath">Component Path</Label>
                  <Input id="componentPath" name="componentPath" placeholder="e.g., math/math-004.tsx" value={formData.componentPath} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="A brief, adventurous description..." value={formData.metadata?.description} onChange={handleInputChange} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select name="subject" value={formData.subject} onValueChange={(v) => handleSelectChange('subject', v)}>
                    <SelectTrigger><SelectValue /></SelectValue>
                    <SelectContent>
                      <SelectItem value="math">Math</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="language">Language</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                   <Select name="difficulty" value={formData.difficulty} onValueChange={(v) => handleSelectChange('difficulty', v)}>
                    <SelectTrigger><SelectValue /></SelectValue>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="questType">Quest Type</Label>
                  <Select name="questType" value={formData.questType} onValueChange={(v) => handleSelectChange('questType', v)}>
                    <SelectTrigger><SelectValue /></SelectValue>
                    <SelectContent>
                      <SelectItem value="investigation">Investigation</SelectItem>
                      <SelectItem value="experiment">Experiment</SelectItem>
                      <SelectItem value="challenge">Challenge</SelectItem>
                      <SelectItem value="mastery">Mastery</SelectItem>
                      <SelectItem value="boss">Boss</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="xpReward">XP Reward</Label>
                  <Input id="xpReward" name="xpReward" type="number" value={formData.metadata?.xpReward} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedTime">Estimated Time (min)</Label>
                  <Input id="estimatedTime" name="estimatedTime" type="number" value={formData.metadata?.estimatedTime} onChange={handleInputChange} />
                </div>
              </div>
              
              <div className="space-y-2">
                  <Label htmlFor="itemRewards">Item Rewards (comma-separated)</Label>
                  <Input id="itemRewards" name="itemRewards" placeholder="e.g., health_potion,scroll_of_wisdom" value={formData.metadata?.itemRewards?.join(',')} onChange={handleInputChange} />
              </div>

              <Button type="submit" disabled={isLoading} size="lg" className="w-full">
                {submitButtonContent}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
