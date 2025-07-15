// src/ai/flows/quest-generation-flow.ts
'use server';
/**
 * @fileOverview A flow for generating educational quests.
 *
 * - generateQuest - A function that creates a quest based on a learning objective.
 * - GenerateQuestInput - The input type for the generateQuest function.
 * - GeneratedQuest - The output type for the generateQuest function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateQuestInputSchema = z.object({
  learningObjective: z.string().describe('The educational goal or topic for the quest.'),
});
export type GenerateQuestInput = z.infer<typeof GenerateQuestInputSchema>;

const ActivitySchema = z.object({
  title: z.string().describe('The title of the activity.'),
  description: z.string().describe('A detailed description of the activity for the student.'),
  type: z
    .enum(['multiple_choice', 'role_playing', 'problem_solving'])
    .describe('The type of activity.'),
});

const GeneratedQuestSchema = z.object({
  title: z.string().describe('A creative and engaging title for the quest.'),
  description: z.string().describe('A brief, adventurous description of the quest storyline.'),
  activities: z
    .array(ActivitySchema)
    .describe('A list of 2-3 activities that a student will perform to complete the quest.'),
});
export type GeneratedQuest = z.infer<typeof GeneratedQuestSchema>;

export async function generateQuest(input: GenerateQuestInput): Promise<GeneratedQuest> {
  return generateQuestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuestPrompt',
  input: { schema: GenerateQuestInputSchema },
  output: { schema: GeneratedQuestSchema },
  prompt: `You are an expert in educational game design, specializing in creating immersive RPG quests. Your task is to generate a quest based on a given learning objective.

The quest must have a creative title, an adventurous description, and 2 to 3 engaging activities. The activities should be one of the following types: 'multiple_choice', 'role_playing', or 'problem_solving'.

Make the quest fun and align it with a fantasy RPG theme.

Learning Objective: {{{learningObjective}}}
`,
});

const generateQuestFlow = ai.defineFlow(
  {
    name: 'generateQuestFlow',
    inputSchema: GenerateQuestInputSchema,
    outputSchema: GeneratedQuestSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
