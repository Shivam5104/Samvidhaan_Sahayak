// LegalRecourseExplanation.ts
'use server';

/**
 * @fileOverview Explains how a specific article of the Indian Constitution can be used as a legal recourse.
 *
 * - legalRecourseExplanation - A function that explains the legal recourse for an article.
 * - LegalRecourseExplanationInput - The input type for the legalRecourseExplanation function.
 * - LegalRecourseExplanationOutput - The return type for the legalRecourseExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LegalRecourseExplanationInputSchema = z.object({
  articleNumber: z.string().describe('The article number of the Indian Constitution.'),
  articleSummary: z.string().describe('A summary of the article of the Indian Constitution.'),
  userExperience: z.string().describe('A description of the user\'s experience with discrimination or rights violation.'),
});
export type LegalRecourseExplanationInput = z.infer<typeof LegalRecourseExplanationInputSchema>;

const LegalRecourseExplanationOutputSchema = z.object({
  legalRecourseExplanation: z.string().describe('An explanation of how the article can be used as a legal recourse, including how to appeal in court.'),
});
export type LegalRecourseExplanationOutput = z.infer<typeof LegalRecourseExplanationOutputSchema>;

export async function legalRecourseExplanation(input: LegalRecourseExplanationInput): Promise<LegalRecourseExplanationOutput> {
  return legalRecourseExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'legalRecourseExplanationPrompt',
  input: {schema: LegalRecourseExplanationInputSchema},
  output: {schema: LegalRecourseExplanationOutputSchema},
  prompt: `You are a legal expert specializing in the Indian Constitution.

  Given the following article summary and the user's experience, explain how the article can be used as a legal recourse for the user, including how they can appeal in court.

  Article Summary: {{{articleSummary}}}
  User Experience: {{{userExperience}}}
  Article Number: {{{articleNumber}}}

  Legal Recourse Explanation:`,
});

const legalRecourseExplanationFlow = ai.defineFlow(
  {
    name: 'legalRecourseExplanationFlow',
    inputSchema: LegalRecourseExplanationInputSchema,
    outputSchema: LegalRecourseExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
