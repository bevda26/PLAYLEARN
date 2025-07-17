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

// More detailed activity schema to match the new blueprint format
const ActivitySchema = z.object({
  type: z.enum(['multiple_choice', 'text_input', 'informational', 'drag_and_drop']),
  content: z.object({
    prompt: z.string().describe('The primary text, question, or instruction for the student.'),
    options: z.array(z.string()).optional().describe('An array of choices for multiple_choice activities.'),
    correctAnswer: z.union([z.string(), z.number()]).optional().describe('The correct answer for the activity.'),
    feedback: z.object({
      correct: z.string().optional(),
      incorrect: z.string().optional(),
    }).optional(),
    uiComponent: z.string().optional().describe('A hint for which ShadCN UI component to use (e.g., "RadioGroup", "Input", "Card", "Alert").'),
  }),
});

// Updated Quest Outline Schema to match the rich blueprint
const QuestOutlineSchema = z.object({
  id: z.string(),
  title: z.string(),
  subjects: z.array(z.string()),
  description: z.string(),
  type: z.string(),
  rewards: z.object({
    xp: z.number(),
    items: z.array(z.string()).optional(),
    unlocks: z.array(z.string()).optional(),
  }),
  prerequisites: z.array(z.string()).optional(),
  activities: z.array(ActivitySchema),
  // Chapter-level context added for better AI understanding
  chapterTitle: z.string(),
  chapterDescription: z.string(),
  sagaId: z.string(),
  trialId: z.string(),
});

const SmithQuestComponentInputSchema = z.object({
  questOutline: QuestOutlineSchema,
  subject: z.string(), // The primary subject to determine the folder path
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

**CRITICAL INSTRUCTIONS:**

1.  **File Structure:** Create a complete, standalone .tsx file. It MUST start with \`'use client';\` and include all necessary imports from React, Lucide, and '@/components/ui/*'.
2.  **Metadata Export:** The file MUST export a \`questModule\` constant containing all the necessary quest metadata.
    *   Use the data from the \`questOutline\` to populate the fields: \`id\`, \`title\`, \`subjects\`, \`description\`, \`questType\`, \`metadata.xpReward\`, \`metadata.itemRewards\`, etc.
    *   Use the provided \`sagaId\` and \`trialId\` from the outline.
    *   Set the \`difficulty\` based on the quest type or title, or default to 'beginner'. 'mastery' or 'boss' types should be 'advanced'.
    *   Do NOT include a \`componentPath\` field in the exported metadata; the system handles this.
3.  **Component Logic:**
    *   Create a default exported React component named appropriately based on the quest title (e.g., \`PatternDiscoveryQuest\`).
    *   The component should be a single, self-contained interactive module that implements ALL activities from the \`questOutline.activities\` array.
    *   Use React hooks (\`useState\`) to manage state for answers, feedback, and progression through the activities.
    *   Use the specified \`uiComponent\` hint from each activity to build the UI. For \`multiple_choice\`, use \`RadioGroup\`. For \`text_input\`, use \`Input\`. For \`informational\`, use \`Card\` or \`Alert\`.
    *   Structure the component logically. If there are multiple activities, render them sequentially or within a container like a \`Card\`.
    *   Provide feedback to the user (e.g., "Correct!" or "Try Again") using the feedback text from the blueprint.
4.  **Content:**
    *   Use the \`title\` and \`description\` from the outline for the main component's text.
    *   Implement each activity in the \`activities\` array as an interactive step.

**Crucial:** The output must be ONLY the raw code for the .tsx file, enclosed in the \`componentCode\` field. Do not add any explanatory text or markdown formatting. Ensure the code is complete and free of syntax errors.

**Quest Outline (JSON):**
\`\`\`json
{{{json questOutline}}}
\`\`\`
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
    if (!output?.componentCode) {
      throw new Error('AI failed to generate component code.');
    }
    return output;
  }
);
