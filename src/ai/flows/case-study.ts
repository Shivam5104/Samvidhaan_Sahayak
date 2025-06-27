'use server';
/**
 * @fileOverview Finds real-life case studies based on an article of the Indian Constitution.
 *
 * - findCaseStudies - A function that finds relevant case studies.
 */

import {ai} from '@/ai/genkit';
import {
  CaseStudyInputSchema,
  CaseStudyOutputSchema,
  type CaseStudyInput,
  type CaseStudyOutput,
} from '@/lib/schema';

export async function findCaseStudies(input: CaseStudyInput): Promise<CaseStudyOutput> {
  return caseStudyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'caseStudyPrompt',
  input: {schema: CaseStudyInputSchema},
  output: {schema: CaseStudyOutputSchema},
  prompt: `You are a legal researcher specializing in Indian constitutional law.
  Based on Article {{articleNumber}} and the user's situation described as '{{userExperience}}', find and summarize 2-3 relevant real-life landmark court cases from India's legal history.
  For each case, provide the case name, the year of the judgment, and a concise summary explaining its relevance.
  Ensure the cases are real and not fictional. If no relevant cases can be found, return an empty array for caseStudies.
`,
});

const caseStudyFlow = ai.defineFlow(
  {
    name: 'caseStudyFlow',
    inputSchema: CaseStudyInputSchema,
    outputSchema: CaseStudyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
