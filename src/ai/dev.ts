import { config } from 'dotenv';
config();

import '@/ai/flows/quest-recommendations.ts';
import '@/ai/flows/quest-generation-flow.ts';
import '@/ai/flows/module-processor-flow.ts';
import '@/ai/flows/generate-quest-image-flow.ts';
import '@/ai/flows/generate-quest-narration-flow.ts';
