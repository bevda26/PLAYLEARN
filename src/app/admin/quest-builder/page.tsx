// src/app/admin/quest-builder/page.tsx
'use client';

import { useState } from 'react';
import { AppHeader } from '@/components/layout/app-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Construction, Wand2, Loader2, Sparkles, FileText, Bot } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import type { ProcessModuleOutput } from '@/ai/flows/module-processor-flow';

export default function QuestBuilderPage() {
  const [learningObjective, setLearningObjective] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const [moduleCode, setModuleCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedData, setProcessedData] = useState<ProcessModuleOutput | null>(null);
  
  const { toast } = useToast();

  const handleProcessModule = async () => {
    // This will be implemented in the next step
    toast({
        title: "Processing In Progress...",
        description: "This feature is not yet fully wired up."
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <AppHeader />
      <main className="max-w-7xl mx-auto p-4 sm:p-8">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-headline text-accent flex items-center justify-center gap-4">
            <Construction className="w-12 h-12" />
            The PlayLearn Builder
          </h1>
          <p className="text-lg text-foreground/80 mt-2">
            A powerful suite of tools to craft intricate learning adventures.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                <CardHeader>
                    <CardTitle className="text-2xl text-accent font-headline flex items-center gap-2">
                        <Sparkles className="w-6 h-6" />
                        AI-Powered Generation
                    </CardTitle>
                    <CardDescription>
                        Generate a complete, multi-activity quest from a single learning objective. The AI will handle the creative work.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <Textarea
                            placeholder="Enter a learning objective, e.g., 'Understand the difference between odd and even numbers' or 'Learn about the phases of the moon'"
                            rows={3}
                            className="bg-background/50"
                            value={learningObjective}
                            onChange={(e) => setLearningObjective(e.target.value)}
                        />
                        <Button type="submit" className="w-full" disabled>
                            <Wand2 className="mr-2 h-5 w-5" />
                            Generate Quest (Coming Soon)
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="space-y-8">
                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                    <CardHeader>
                        <CardTitle className="text-2xl text-accent font-headline flex items-center gap-2">
                            <FileText className="w-6 h-6" />
                            Full Module Processing
                        </CardTitle>
                        <CardDescription>
                           Paste the entire code for a quest module (like your `class6-math-chapter1.js` file) and the AI will extract the necessary data.
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
                                {isProcessing ? (
                                    <><Loader2 className="animate-spin" /> Processing...</>
                                ) : (
                                    <><Bot className="mr-2" /> Process Module with AI</>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                    {processedData && (
                        <CardFooter className="mt-4">
                           <div className="w-full p-4 bg-primary/10 rounded-lg border border-primary/30">
                               <h4 className="font-bold text-lg text-accent mb-2">Processed Data:</h4>
                               <pre className="text-xs whitespace-pre-wrap bg-background/50 p-2 rounded">
                                   {JSON.stringify(processedData, null, 2)}
                               </pre>
                           </div>
                        </CardFooter>
                    )}
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-primary/20">
                    <CardHeader>
                        <CardTitle className="text-2xl text-accent font-headline">Manual Registration</CardTitle>
                        <CardDescription>
                           For simple, single-component quests, you can still use the original Forge tool.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center">
                       <Link href="/admin/quest-forge">
                            <Button size="lg">
                                Go to the Old Forge
                            </Button>
                       </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}
