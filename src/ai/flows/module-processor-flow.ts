// src/ai/flows/module-processor-flow.ts
'use server';
/**
 * @fileOverview An AI flow for processing and validating raw quest module code.
 *
 * - processModule - A function that analyzes raw code, extracts metadata, and returns structured quest data.
 * - ProcessModuleInput - The input type for the processModule function.
 * - ProcessModuleOutput - The return type for the processModule function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const ProcessModuleInputSchema = z.object({
  moduleCode: z.string().describe('The raw JavaScript/TypeScript code of the quest module.'),
});
export type ProcessModuleInput = z.infer<typeof ProcessModuleInputSchema>;

const ProcessModuleOutputSchema = z.object({
  id: z.string().describe('The unique identifier for the quest (e.g., "math-001").'),
  title: z.string().describe('The title of the quest.'),
  subject: z.enum(['math', 'science', 'language', 'history']).describe('The subject category of the quest.'),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).describe('The difficulty level of the quest.'),
  questType: z.enum(['investigation', 'experiment', 'challenge', 'mastery', 'boss']).describe('The type of quest.'),
  componentPath: z.string().describe('The automatically determined file path for the component, e.g., "math/math-001.tsx".'),
  metadata: z.object({
    description: z.string().describe('A brief, adventurous description of the quest storyline.'),
    estimatedTime: z.number().describe('The estimated time to complete the quest in minutes.'),
    xpReward: z.number().describe('The amount of XP awarded for completing the quest.'),
    itemRewards: z.array(z.string()).optional().describe('An array of item IDs awarded upon completion.'),
  }),
});
export type ProcessModuleOutput = z.infer<typeof ProcessModuleOutputSchema>;

export async function processModule(input: ProcessModuleInput): Promise<ProcessModuleOutput> {
  return processModuleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'processModulePrompt',
  input: { schema: ProcessModuleInputSchema },
  output: { schema: ProcessModuleOutputSchema },
  prompt: `You are an expert at parsing and validating educational game modules. Your task is to analyze the provided raw code for a quest module and extract its core metadata into a structured JSON format.

  **Instructions:**
  1.  Read the provided 'moduleCode'.
  2.  Identify the main metadata object. It might be called 'chapterModule', 'questData', or something similar.
  3.  From this object, extract the following fields: id, title, subject, difficulty, questType, description, estimatedTime, and xpReward.
  4.  For 'itemRewards', find the list of item IDs. If it doesn't exist, omit the field.
  5.  For 'componentPath', automatically generate the correct path based on the 'subject' and 'id'. The format should be 'subject/id.tsx'. For example, a math quest with id 'math-005' should have a componentPath of 'math/math-005.tsx'.
  6.  Map the input data precisely to the output schema. Ensure all data types are correct. For example, 'estimatedTime' and 'xpReward' must be numbers.

  **Important:** Only extract data from the first quest defined in the file (e.g., 'investigationQuest' if multiple exist). Do not try to combine all quests in a multi-quest file.

  Module Code:
  \`\`\`javascript
  {{{moduleCode}}}
  \`\`\`
`,
});

const processModuleFlow = ai.defineFlow(
  {
    name: 'processModuleFlow',
    inputSchema: ProcessModuleInputSchema,
    outputSchema: ProcessModuleOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
