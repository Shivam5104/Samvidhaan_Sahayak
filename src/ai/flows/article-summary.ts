// Article Summary Genkit Flow
'use server';
/**
 * @fileOverview Summarizes the key provisions of a specific article of the Indian Constitution.
 *
 * - articleSummary - A function that summarizes the article of the Indian Constitution.
 * - ArticleSummaryInput - The input type for the articleSummary function.
 * - ArticleSummaryOutput - The return type for the articleSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ArticleSummaryInputSchema = z.object({
  articleNumber: z.string().describe('The article number of the Indian Constitution to summarize.'),
});
export type ArticleSummaryInput = z.infer<typeof ArticleSummaryInputSchema>;

const ArticleSummaryOutputSchema = z.object({
  summary: z.string().describe('A summarized explanation of the key provisions of the article.'),
});
export type ArticleSummaryOutput = z.infer<typeof ArticleSummaryOutputSchema>;

export async function articleSummary(input: ArticleSummaryInput): Promise<ArticleSummaryOutput> {
  return articleSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'articleSummaryPrompt',
  input: {schema: ArticleSummaryInputSchema},
  output: {schema: ArticleSummaryOutputSchema},
  prompt: `Summarize the key provisions of Article {{articleNumber}} of the Indian Constitution. Provide a clear and concise explanation.
`,
});

const articleSummaryFlow = ai.defineFlow(
  {
    name: 'articleSummaryFlow',
    inputSchema: ArticleSummaryInputSchema,
    outputSchema: ArticleSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
