
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
  availableQuests: z.array(z.string()).describe('The list of available quests, each formatted as "id: title - description".')
});
export type RecommendQuestsInput = z.infer<typeof RecommendQuestsInputSchema>;

const RecommendQuestsOutputSchema = z.object({
  recommendedQuests: z.array(z.string()).describe('An array of 1-3 recommended quest strings that best match the learning goals. The strings must be taken directly from the "availableQuests" input.'),
  reasoning: z.string().describe('A short, encouraging explanation for why these specific quests were recommended, written from the perspective of a helpful RPG quest advisor.'),
});
export type RecommendQuestsOutput = z.infer<typeof RecommendQuestsOutputSchema>;

export async function recommendQuests(input: RecommendQuestsInput): Promise<RecommendQuestsOutput> {
  return recommendQuestsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendQuestsPrompt',
  input: {schema: RecommendQuestsInputSchema},
  output: {schema: RecommendQuestsOutputSchema},
  prompt: `You are an AI Quest Advisor in an epic RPG learning game. Your role is to help players find the perfect quests to match their learning ambitions.

A player has provided their learning goals. Based on these goals, and the list of available quests, recommend 1 to 3 quests that are the best fit.

Provide a short, encouraging explanation for your recommendations.

The player's learning goals are:
"{{{learningGoals}}}"

Here are the available quests:
{{#each availableQuests}}
- {{{this}}}
{{/each}}

Select the most relevant quest strings from the list above and place them in the 'recommendedQuests' array. Ensure your output format is correct.
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

    