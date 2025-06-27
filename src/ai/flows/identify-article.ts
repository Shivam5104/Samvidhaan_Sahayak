'use server';
/**
 * @fileOverview Identifies the most relevant article of the Indian Constitution based on a user's description.
 *
 * - identifyArticle - A function that identifies the most relevant constitutional article.
 * - IdentifyArticleInput - The input type for the identifyArticle function.
 * - IdentifyArticleOutput - The return type for the identifyArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentifyArticleInputSchema = z.object({
  userExperience: z.string().describe("A description of the user's experience with discrimination or rights violation."),
});
export type IdentifyArticleInput = z.infer<typeof IdentifyArticleInputSchema>;

const IdentifyArticleOutputSchema = z.object({
  articleNumber: z.string().describe('The single most relevant article number of the Indian Constitution (e.g., "15", "21").'),
  reasoning: z.string().describe('A brief explanation for why this article was chosen as the most relevant.'),
});
export type IdentifyArticleOutput = z.infer<typeof IdentifyArticleOutputSchema>;

export async function identifyArticle(input: IdentifyArticleInput): Promise<IdentifyArticleOutput> {
  return identifyArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'identifyArticlePrompt',
  input: {schema: IdentifyArticleInputSchema},
  output: {schema: IdentifyArticleOutputSchema},
  prompt: `You are an expert in the Indian Constitution. Based on the user's situation described below, identify the single most relevant article from the Indian Constitution that has been violated or is applicable.

User's Situation: {{{userExperience}}}

Return only the article number and a brief, one-sentence reasoning for why this article was chosen. For example, if the user describes being denied entry to a shop because of their caste, you should identify Article 15.`,
});

const identifyArticleFlow = ai.defineFlow(
  {
    name: 'identifyArticleFlow',
    inputSchema: IdentifyArticleInputSchema,
    outputSchema: IdentifyArticleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
