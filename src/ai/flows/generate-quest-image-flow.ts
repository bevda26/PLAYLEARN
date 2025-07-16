// src/ai/flows/generate-quest-image-flow.ts
'use server';
/**
 * @fileOverview A flow for generating images for quests.
 *
 * - generateQuestImage - A function that creates an image based on a quest description.
 * - GenerateQuestImageInput - The input type for the generateQuestImage function.
 * - GenerateQuestImageOutput - The output type for the generateQuestImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateQuestImageInputSchema = z.object({
  questDescription: z.string().describe('A detailed description of the quest storyline and setting.'),
});
export type GenerateQuestImageInput = z.infer<typeof GenerateQuestImageInputSchema>;

const GenerateQuestImageOutputSchema = z.object({
  imageUrl: z
    .string()
    .describe(
      "The generated image as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateQuestImageOutput = z.infer<typeof GenerateQuestImageOutputSchema>;

export async function generateQuestImage(
  input: GenerateQuestImageInput
): Promise<GenerateQuestImageOutput> {
  return generateQuestImageFlow(input);
}

const generateQuestImageFlow = ai.defineFlow(
  {
    name: 'generateQuestImageFlow',
    inputSchema: GenerateQuestImageInputSchema,
    outputSchema: GenerateQuestImageOutputSchema,
  },
  async ({ questDescription }) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a fantasy RPG style illustration that captures the essence of this quest description: ${questDescription}`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media.url) {
      throw new Error('Image generation failed to produce an image.');
    }

    return { imageUrl: media.url };
  }
);
