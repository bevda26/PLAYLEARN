// src/ai/flows/generate-quest-narration-flow.ts
'use server';
/**
 * @fileOverview A flow for generating audio narration for quest descriptions.
 *
 * - generateQuestNarration - A function that creates an audio narration for a quest.
 * - GenerateQuestNarrationInput - The input type for the generateQuestNarration function.
 * - GenerateQuestNarrationOutput - The output type for the generateQuestNarration function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import wav from 'wav';
import { googleAI } from '@genkit-ai/googleai';


const GenerateQuestNarrationInputSchema = z.object({
  textToNarrate: z.string().describe('The text content to be converted into speech.'),
});
export type GenerateQuestNarrationInput = z.infer<typeof GenerateQuestNarrationInputSchema>;

const GenerateQuestNarrationOutputSchema = z.object({
  audioUrl: z
    .string()
    .describe(
      "The generated audio as a data URI. Expected format: 'data:audio/wav;base64,<encoded_data>'."
    ),
});
export type GenerateQuestNarrationOutput = z.infer<typeof GenerateQuestNarrationOutputSchema>;


export async function generateQuestNarration(
  input: GenerateQuestNarrationInput
): Promise<GenerateQuestNarrationOutput> {
  return generateQuestNarrationFlow(input);
}

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

const generateQuestNarrationFlow = ai.defineFlow(
  {
    name: 'generateQuestNarrationFlow',
    inputSchema: GenerateQuestNarrationInputSchema,
    outputSchema: GenerateQuestNarrationOutputSchema,
  },
  async ({ textToNarrate }) => {
     const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' },
          },
        },
      },
      prompt: `Narrate the following text in the style of an epic fantasy quest giver: ${textToNarrate}`,
    });

    if (!media || !media.url) {
      throw new Error('no media returned');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    
    const wavBase64 = await toWav(audioBuffer);

    return {
      audioUrl: 'data:audio/wav;base64,' + wavBase64,
    };
  }
);
