// src/app/admin/quest-builder/page.tsx
'use client';

import { useState } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Construction, Wand2, Loader2, Sparkles, FileText, Bot, ImageIcon, Code2, Hammer } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import type { ProcessModuleOutput } from '@/ai/flows/module-processor-flow';
import { processModule } from '@/ai/flows/module-processor-flow';
import { generateQuest, type GeneratedQuest } from '@/ai/flows/quest-generation-flow';
import { generateQuestImage } from '@/ai/flows/generate-quest-image-flow';
import { smithQuestComponent } from '@/ai/flows/quest-smith-flow';
import { registerQuestModule } from '@/lib/auto-integration/route-generator';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { QuestModule } from '@/lib/types';


export default function QuestBuilderPage() {
  const [learningObjective, setLearningObjective] = useState('');
  const [subject, setSubject] = useState<'math' | 'science' | 'language' | 'history'>('math');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedQuest, setGeneratedQuest] = useState<GeneratedQuest | null>(null);

  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const [isSmithing, setIsSmithing] = useState(false);
  const [smithedCode, setSmithedCode] = useState<string | null>(null);

  const [moduleCode, setModuleCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedData, setProcessedData] = useState<ProcessModuleOutput | null>(null);
  
  const { toast } = useToast();

  const handleGenerateQuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!learningObjective) return;
    setIsGenerating(true);
    setGeneratedQuest(null);
    setGeneratedImageUrl(null);
    setSmithedCode(null);
    try {
      const result = await generateQuest({ learningObjective });
      setGeneratedQuest(result);
       toast({
        title: "Quest Generated!",
        description: "The AI has crafted a new quest structure for you.",
      });
    } catch (error: any) {
       toast({
        title: "Generation Failed",
        description: error.message || "Could not generate quest.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!generatedQuest) return;
    setIsGeneratingImage(true);
    setGeneratedImageUrl(null);
    try {
      const result = await generateQuestImage({ questDescription: generatedQuest.description });
      setGeneratedImageUrl(result.imageUrl);
      toast({
        title: "Image Generated!",
        description: "The AI has created a visual for your quest.",
      });
    } catch (error: any) {
       toast({
        title: "Image Generation Failed",
        description: error.message || "Could not generate image.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingImage(false);
    }
  };

  const handleSmithComponent = async () => {
    if (!generatedQuest) return;
    setIsSmithing(true);
    setSmithedCode(null);
    try {
      const result = await smithQuestComponent({ questOutline: generatedQuest, subject });
      setSmithedCode(result.componentCode);
      toast({
        title: "Component Smithed!",
        description: "The AI has generated the full .tsx component code.",
      });
    } catch (error: any) {
       toast({
        title: "Component Smithing Failed",
        description: error.message || "Could not generate component code.",
        variant: "destructive",
      });
    } finally {
      setIsSmithing(false);
    }
  };


  const handleProcessModule = async () => {
    if (!moduleCode) return;
    setIsProcessing(true);
    setProcessedData(null);
    try {
      const processedOutput = await processModule({ moduleCode });
      setProcessedData(processedOutput);
      await registerQuestModule(processedOutput);
      toast({
        title: "Module Processed & Registered!",
        description: `Quest "${processedOutput.title}" is now live.`,
      });
    } catch (error: any) {
        toast({
            title: "Processing Failed",
            description: error.message || "Could not process and register the module.",
            variant: "destructive"
        })
    } finally {
      setIsProcessing(false);
    }
  };

  const generateButtonContent = isGenerating ? <><Loader2 className="animate-spin" /> Generating...</> : <><Wand2 className="mr-2 h-5 w-5" /> Generate Quest</>;
  const generateImageButtonContent = isGeneratingImage ? <><Loader2 className="animate-spin" /> Generating Image...</> : <><ImageIcon className="mr-2 h-5 w-5" /> Generate Image</>;
  const smithComponentButtonContent = isSmithing ? <><Loader2 className="animate-spin" /> Smithing Code...</> : <><Code2 className="mr-2 h-5 w-5" /> Smith Quest Component</>;
  const processButtonContent = isProcessing ? <><Loader2 className="animate-spin" /> Processing...</> : <><Bot className="mr-2" /> Process & Register Module</>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <AppHeader />
      <main className="max-w-4xl mx-auto p-4 sm:p-8">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-headline text-accent flex items-center justify-center gap-4">
            <Construction className="w-12 h-12" />
            The PlayLearn Builder
          </h1>
          <p className="text-lg text-foreground/80 mt-2">
            A powerful suite of tools to craft intricate learning adventures.
          </p>
        </header>

        <div className="space-y-8">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                  <CardTitle className="text-2xl text-accent font-headline flex items-center gap-2">
                      <Sparkles className="w-6 h-6" />
                      Step 1: AI-Powered Generation
                  </CardTitle>
                  <CardDescription>
                      Generate a complete quest from a single learning objective. The AI will handle the creative work.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <form onSubmit={handleGenerateQuest} className="space-y-4">
                      <Label htmlFor="learning-objective">Learning Objective</Label>
                      <Textarea
                          id="learning-objective"
                          placeholder="e.g., 'Understand the difference between odd and even numbers' or 'Learn about the phases of the moon'"
                          rows={3}
                          className="bg-background/50"
                          value={learningObjective}
                          onChange={(e) => setLearningObjective(e.target.value)}
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="subject">Subject</Label>
                            <Select value={subject} onValueChange={(v) => setSubject(v as any)}>
                                <SelectTrigger id="subject"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="math">Math</SelectItem>
                                    <SelectItem value="science">Science</SelectItem>
                                    <SelectItem value="language">Language</SelectItem>
                                    <SelectItem value="history">History</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button type="submit" className="self-end" disabled={isGenerating || !learningObjective}>
                            {generateButtonContent}
                        </Button>
                      </div>
                  </form>
              </CardContent>
              {generatedQuest && (
                  <CardFooter className="mt-4 flex-col items-start gap-4">
                      <div className="w-full p-4 bg-primary/10 rounded-lg border border-primary/30 space-y-4">
                          <h4 className="font-bold text-lg text-accent mb-2">Generated Quest Outline & Assets:</h4>
                          <Accordion type="multiple" className="w-full space-y-2">
                              <AccordionItem value="item-1" className="bg-background/50 rounded-lg px-4 border-primary/20">
                                  <AccordionTrigger>Quest JSON Outline</AccordionTrigger>
                                  <AccordionContent>
                                      <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(generatedQuest, null, 2)}</pre>
                                  </AccordionContent>
                              </AccordionItem>
                              
                              <AccordionItem value="item-2" className="bg-background/50 rounded-lg px-4 border-primary/20">
                                  <AccordionTrigger>Generated Image</AccordionTrigger>
                                  <AccordionContent>
                                      <Button onClick={handleGenerateImage} className="w-full mb-4" disabled={isGeneratingImage}>{generateImageButtonContent}</Button>
                                      {isGeneratingImage && <Skeleton className="aspect-video w-full" />}
                                      {generatedImageUrl && <Image src={generatedImageUrl} alt="Generated quest image" width={500} height={281} className="rounded-md object-cover aspect-video" />}
                                  </AccordionContent>
                              </AccordionItem>

                              <AccordionItem value="item-3" className="bg-background/50 rounded-lg px-4 border-primary/20">
                                  <AccordionTrigger>Generated Component Code</AccordionTrigger>
                                  <AccordionContent>
                                      <Button onClick={handleSmithComponent} className="w-full mb-4" disabled={isSmithing}>{smithComponentButtonContent}</Button>
                                      {isSmithing && <Skeleton className="h-48 w-full" />}
                                      {smithedCode && <Textarea value={smithedCode} readOnly rows={20} className="font-mono text-xs bg-gray-900 text-green-300 border-green-500/50" />}
                                  </AccordionContent>
                              </AccordionItem>
                          </Accordion>
                      </div>
                  </CardFooter>
              )}
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
              <CardHeader>
                  <CardTitle className="text-2xl text-accent font-headline flex items-center gap-2">
                      <FileText className="w-6 h-6" />
                      Step 2: Process & Register Module
                  </CardTitle>
                  <CardDescription>
                     Paste the code for a quest module (e.g., from the generator above, or from your own file) and the AI will extract its data and register it in the system.
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4">
                     <Textarea 
                          placeholder="Paste your entire module code here..."
                          rows={10}
                          className="bg-background/50 font-mono text-xs"
                          value={moduleCode}
                          onChange={(e) => setModuleCode(e.target.value)}
                     />
                      <Button className="w-full" onClick={handleProcessModule} disabled={isProcessing || !moduleCode}>
                          {processButtonContent}
                      </Button>
                  </div>
              </CardContent>
              {processedData && (
                  <CardFooter className="mt-4">
                     <div className="w-full p-4 bg-primary/10 rounded-lg border border-primary/30">
                         <h4 className="font-bold text-lg text-accent mb-2">Successfully Processed & Registered:</h4>
                         <pre className="text-xs whitespace-pre-wrap bg-background/50 p-2 rounded">
                             {JSON.stringify(processedData, null, 2)}
                         </pre>
                     </div>
                  </CardFooter>
              )}
          </Card>
          
          <Accordion type="single" collapsible>
            <AccordionItem value="manual-forge" className="border-b-0">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                    <AccordionTrigger className="p-6 hover:no-underline">
                        <CardHeader className="p-0 text-left">
                           <CardTitle className="text-2xl text-accent font-headline flex items-center gap-2">
                                <Hammer className="w-6 h-6" />
                                Manual Registration (The Old Forge)
                           </CardTitle>
                           <CardDescription>
                               For simple quests or manual overrides, you can still use the original Forge tool.
                           </CardDescription>
                        </CardHeader>
                    </AccordionTrigger>
                    <AccordionContent className="p-6 pt-0">
                        <QuestForgeForm />
                    </AccordionContent>
                </Card>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
    </div>
  );
}


// Extracted Quest Forge Form for reusability
function QuestForgeForm() {
    const [formData, setFormData] = useState<Omit<QuestModule, 'createdAt'>>({
        id: 'subject-001',
        title: "Quest Title",
        subject: 'math',
        difficulty: 'beginner',
        questType: 'investigation',
        componentPath: 'subject/subject-001.tsx',
        metadata: {
            description: 'A brief, adventurous description of the quest storyline.',
            estimatedTime: 15,
            xpReward: 100,
            itemRewards: [],
        },
    });
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name in formData.metadata) {
            let parsedValue: any = value;
            if (name === 'estimatedTime' || name === 'xpReward') {
                parsedValue = parseInt(value) || 0;
            } else if (name === 'itemRewards') {
                parsedValue = value.split(',').map(s => s.trim()).filter(Boolean);
            }
            setFormData(prev => ({
                ...prev,
                metadata: { ...prev.metadata, [name]: parsedValue },
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
            if (!formData.id || !formData.title || !formData.componentPath) {
                throw new Error("ID, Title, and Component Path are required.");
            }
            await registerQuestModule(formData);
            toast({ title: 'Quest Registered!', description: `Quest "${formData.title}" has been added.` });
        } catch (error: any) {
            toast({ title: 'Failed to register quest.', description: error.message, variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };

    const submitButtonContent = isLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Registering...</> : <><Hammer className="mr-2 h-5 w-5" /> Register Quest</>;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="id">Quest ID</Label><Input id="id" name="id" placeholder="e.g., math-004" value={formData.id} onChange={handleInputChange} required /></div>
                <div className="space-y-2"><Label htmlFor="title">Quest Title</Label><Input id="title" name="title" placeholder="The Alchemist's Riddle" value={formData.title} onChange={handleInputChange} required /></div>
            </div>
            <div className="space-y-2"><Label htmlFor="componentPath">Component Path</Label><Input id="componentPath" name="componentPath" placeholder="e.g., math/math-004.tsx" value={formData.componentPath} onChange={handleInputChange} required /></div>
            <div className="space-y-2"><Label htmlFor="description">Description</Label><Textarea id="description" name="description" placeholder="A brief, adventurous description..." value={formData.metadata.description} onChange={handleInputChange} /></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2"><Label htmlFor="subject-manual">Subject</Label><Select name="subject" value={formData.subject} onValueChange={(v) => handleSelectChange('subject', v)}><SelectTrigger id="subject-manual"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="math">Math</SelectItem><SelectItem value="science">Science</SelectItem><SelectItem value="language">Language</SelectItem><SelectItem value="history">History</SelectItem></SelectContent></Select></div>
                <div className="space-y-2"><Label htmlFor="difficulty">Difficulty</Label><Select name="difficulty" value={formData.difficulty} onValueChange={(v) => handleSelectChange('difficulty', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="beginner">Beginner</SelectItem><SelectItem value="intermediate">Intermediate</SelectItem><SelectItem value="advanced">Advanced</SelectItem></SelectContent></Select></div>
                <div className="space-y-2"><Label htmlFor="questType">Quest Type</Label><Select name="questType" value={formData.questType} onValueChange={(v) => handleSelectChange('questType', v)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="investigation">Investigation</SelectItem><SelectItem value="experiment">Experiment</SelectItem><SelectItem value="challenge">Challenge</SelectItem><SelectItem value="mastery">Mastery</SelectItem><SelectItem value="boss">Boss</SelectItem></SelectContent></Select></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="xpReward">XP Reward</Label><Input id="xpReward" name="xpReward" type="number" value={formData.metadata.xpReward} onChange={handleInputChange} /></div>
                <div className="space-y-2"><Label htmlFor="estimatedTime">Estimated Time (min)</Label><Input id="estimatedTime" name="estimatedTime" type="number" value={formData.metadata.estimatedTime} onChange={handleInputChange} /></div>
            </div>
            <div className="space-y-2"><Label htmlFor="itemRewards">Item Rewards (comma-separated)</Label><Input id="itemRewards" name="itemRewards" placeholder="e.g., health_potion,scroll_of_wisdom" value={formData.metadata.itemRewards?.join(',')} onChange={handleInputChange} /></div>
            <Button type="submit" disabled={isLoading} size="lg" className="w-full">{submitButtonContent}</Button>
        </form>
    );
}
