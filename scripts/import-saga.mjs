#!/usr/bin/env node
/**
 * @fileOverview Saga Importer Script
 *
 * This script reads a chapter blueprint from `src/content-blueprints`,
 * processes each quest within its `questArc`, calls an AI to generate
 * the component code, and saves the final .tsx files to `src/quest-modules`.
 *
 * Usage:
 * npm run import:saga <filename>
 * e.g., npm run import:saga class6-math-chapter1.js
 */
import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { smithQuestComponent } from '../src/ai/flows/quest-smith-flow.js';

const blueprintsDir = path.join(process.cwd(), 'src', 'content-blueprints');
const outputDir = path.join(process.cwd(), 'src', 'quest-modules');

async function main() {
  const args = process.argv.slice(2);
  if (args.length !== 1) {
    console.error('Usage: npm run import:saga <filename.js>');
    process.exit(1);
  }

  const filename = args[0];
  const blueprintPath = path.join(blueprintsDir, filename);

  console.log(`🔵 Importing saga from: ${filename}`);

  try {
    // Dynamically import the blueprint module
    const module = await import(blueprintPath);
    if (!module.chapterModule) {
      throw new Error(`The file ${filename} must export a 'chapterModule' constant.`);
    }

    const { metadata: chapterMetadata, questArc } = module.chapterModule;

    if (!questArc || Object.keys(questArc).length === 0) {
      throw new Error('The chapterModule must contain a non-empty `questArc` object.');
    }

    // Ensure the output subject directory exists
    const subject = chapterMetadata.subjects[0]; // Use the primary subject for the folder
    if (!subject) {
        throw new Error("Chapter metadata must contain at least one subject.");
    }
    const subjectDir = path.join(outputDir, subject);
    await fs.mkdir(subjectDir, { recursive: true });

    console.log(`Found ${Object.keys(questArc).length} quests in the arc. Starting AI generation...`);

    for (const [questKey, questData] of Object.entries(questArc)) {
      console.log(`  - Processing quest: "${questData.title}"`);
      
      const trialId = `trial-${chapterMetadata.class}`;
      const sagaId = chapterMetadata.id;

      const smithingInput = {
        questOutline: {
          ...questData,
          // Add chapter-level context for the AI
          chapterTitle: chapterMetadata.title,
          chapterDescription: chapterMetadata.description,
          sagaId: sagaId,
          trialId: trialId,
        },
        subject: subject,
      };

      try {
        const { componentCode } = await smithQuestComponent(smithingInput);
        
        if (!componentCode) {
            throw new Error("AI smith returned empty component code.");
        }

        const outputFilename = `${questData.id}.tsx`;
        const outputPath = path.join(subjectDir, outputFilename);

        await fs.writeFile(outputPath, componentCode);
        console.log(`    ✅ Successfully generated and saved to: ${path.relative(process.cwd(), outputPath)}`);

      } catch (aiError) {
        console.error(`    ❌ AI generation failed for quest "${questData.title}":`, aiError);
      }
    }

    console.log('🟢 Saga import process completed successfully!');

  } catch (error) {
    console.error(`🔴 Error importing saga: ${error.message}`);
    process.exit(1);
  }
}

main();
