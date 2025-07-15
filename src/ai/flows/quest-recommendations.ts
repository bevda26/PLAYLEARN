// src/ai/flows/quest-recommendations.ts
'use server';

/**
 * @fileOverview A flow for recommending quests based on learning goals and module content.
 *
 * - recommendQuests - A function that recommends quests based on learning goals and module content.
 * - RecommendQuestsInput - The input type for the recommendQuests function.
 * - RecommendQuestsOutput - The return type for the recommendQuests function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendQuestsInputSchema = z.object({
  learningGoals: z.string().describe('The learning goals of the player.'),
  moduleContent: z.string().describe('The content of the educational module.'),
  availableQuests: z.array(z.string()).describe('The list of available quest IDs.')
});
export type RecommendQuestsInput = z.infer<typeof RecommendQuestsInputSchema>;

const RecommendQuestsOutputSchema = z.object({
  recommendedQuests: z.array(z.string()).describe('The recommended quest IDs based on learning goals and module content.'),
  reasoning: z.string().describe('The reasoning behind the quest recommendations.'),
});
export type RecommendQuestsOutput = z.infer<typeof RecommendQuestsOutputSchema>;

export async function recommendQuests(input: RecommendQuestsInput): Promise<RecommendQuestsOutput> {
  return recommendQuestsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendQuestsPrompt',
  input: {schema: RecommendQuestsInputSchema},
  output: {schema: RecommendQuestsOutputSchema},
  prompt: `You are an AI quest recommendation engine. Given the learning goals of a player and the content of an educational module, you will recommend a list of quests that align with those goals and content.

Learning Goals: {{{learningGoals}}}
Module Content: {{{moduleContent}}}
Available Quests: {{{availableQuests}}}

Consider how each quest helps the player achieve their learning goals given the module content. Provide reasoning for each recommended quest.

Output the quest IDs in the recommendedQuests array, and the reasoning in the reasoning field.
`, 
});

const recommendQuestsFlow = ai.defineFlow(
  {
    name: 'recommendQuestsFlow',
    inputSchema: RecommendQuestsInputSchema,
    outputSchema: RecommendQuestsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
