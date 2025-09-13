'use server';
/**
 * @fileOverview Compares two articles of the Indian Constitution.
 *
 * - compareArticles - A function that compares two constitutional articles.
 * - CompareArticlesInput - The input type for the compareArticles function.
 * - CompareArticlesOutput - The return type for the compareArticles function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CompareArticlesInputSchema = z.object({
  articleOne: z.string().describe('The first article number of the Indian Constitution to compare.'),
  articleTwo: z.string().describe('The second article number of the Indian Constitution to compare.'),
});
export type CompareArticlesInput = z.infer<typeof CompareArticlesInputSchema>;

const CompareArticlesOutputSchema = z.object({
  comparison: z.string().describe('A detailed comparison of the two articles, explaining their relationship, overlaps, conflicts, and judicial interpretations.'),
});
export type CompareArticlesOutput = z.infer<typeof CompareArticlesOutputSchema>;

export async function compareArticles(input: CompareArticlesInput): Promise<CompareArticlesOutput> {
  return compareArticlesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'compareArticlesPrompt',
  input: {schema: CompareArticlesInputSchema},
  output: {schema: CompareArticlesOutputSchema},
  prompt: `You are an expert in Indian constitutional law.
  Provide a detailed comparison of Article {{articleOne}} and Article {{articleTwo}} of the Indian Constitution.

  Your analysis should cover the following points:
  1.  **Core Subject Matter:** Briefly explain what each article is about.
  2.  **Relationship & Overlap:** Describe how the two articles relate to each other. Do they complement, supplement, or operate in different spheres?
  3.  **Potential Conflicts:** Are there any apparent conflicts or tensions between the provisions of these two articles?
  4.  **Judicial Interpretation:** Briefly mention how the Supreme Court of India has interpreted these articles together in landmark cases, if applicable.

  Structure your response clearly with headings for each section.
`,
});

const compareArticlesFlow = ai.defineFlow(
  {
    name: 'compareArticlesFlow',
    inputSchema: CompareArticlesInputSchema,
    outputSchema: CompareArticlesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
