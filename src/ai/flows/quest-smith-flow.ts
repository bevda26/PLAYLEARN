// src/ai/flows/quest-smith-flow.ts
'use server';
/**
 * @fileOverview An AI flow for generating full React quest components from a structured outline.
 *
 * - smithQuestComponent - A function that takes a quest outline and generates the .tsx code.
 * - SmithQuestComponentInput - The input type for the smithQuestComponent function.
 * - SmithQuestComponentOutput - The return type for the smithQuestComponent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GeneratedQuestSchema } from './quest-generation-flow';

const SmithQuestComponentInputSchema = z.object({
  questOutline: GeneratedQuestSchema,
  subject: z.enum(['math', 'science', 'language', 'history']),
});
export type SmithQuestComponentInput = z.infer<typeof SmithQuestComponentInputSchema>;

const SmithQuestComponentOutputSchema = z.object({
  componentCode: z.string().describe('The complete, syntactically correct code for the React .tsx component file.'),
});
export type SmithQuestComponentOutput = z.infer<typeof SmithQuestComponentOutputSchema>;

export async function smithQuestComponent(input: SmithQuestComponentInput): Promise<SmithQuestComponentOutput> {
  return smithQuestComponentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smithQuestComponentPrompt',
  input: { schema: SmithQuestComponentInputSchema },
  output: { schema: SmithQuestComponentOutputSchema },
  prompt: `You are an expert React and Next.js developer creating educational RPG quests. Your task is to write the complete code for a new quest component file (.tsx) based on a provided JSON outline.

**Instructions:**
1.  **File Structure:** Create a complete, standalone .tsx file. It must start with \`'use client';\` and include all necessary imports from React, Lucide, and '@/components/ui/*'.
2.  **Metadata Export:** The file MUST export a \`questModule\` constant containing all the necessary metadata (id, title, subject, etc.).
    *   The \`id\` should be formatted as \`subject-timestamp\`, e.g., \`math-1678886400000\`. Use a unique placeholder timestamp.
    *   The \`componentPath\` field should NOT be included in this export.
    *   Use the provided subject to fill in the 'subject' field.
    *   Hardcode difficulty to 'beginner', questType to 'challenge', estimatedTime to 15, and xpReward to 150 for this generated component.
3.  **Component Logic:**
    *   Create a default exported React component named appropriately (e.g., \`QuestTitleComponent\`).
    *   The component should be a single, self-contained interactive quiz or challenge based on the quest outline's activities.
    *   Use React hooks (\`useState\`) to manage the state of the interactive elements.
    *   Use ShadCN components (\`Card\`, \`Button\`, \`RadioGroup\`, \`Input\`, etc.) to build the UI.
    *   Provide feedback to the user (e.g., "Correct!" or "Try Again") using components like \`Alert\` or by rendering text conditionally.
4.  **Content:**
    *   Use the \`title\` from the quest outline for the main component title.
    *   Use the \`description\` for the quest's descriptive text.
    *   Implement the \`activities\` as interactive steps. For a 'multiple_choice' activity, use a \`RadioGroup\`. For 'problem_solving', use an \`Input\` and a 'Check Answer' button.

**Crucial:** The output must be ONLY the raw code for the .tsx file, enclosed in the \`componentCode\` field. Do not add any explanatory text outside of the code. Ensure the code is complete and free of syntax errors.

**Quest Outline:**
\`\`\`json
{{{json questOutline}}}
\`\`\`

**Subject:** {{{subject}}}
`,
});

const smithQuestComponentFlow = ai.defineFlow(
  {
    name: 'smithQuestComponentFlow',
    inputSchema: SmithQuestComponentInputSchema,
    outputSchema: SmithQuestComponentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
