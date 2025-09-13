'use server';
/**
 * @fileOverview Explains a keyword from the Preamble of the Indian Constitution.
 *
 * - explainPreambleKeyword - A function that explains a keyword from the Preamble.
 * - ExplainPreambleKeywordInput - The input type for the explainPreambleKeyword function.
 * - ExplainPreambleKeywordOutput - The return type for the explainPreambleKeyword function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainPreambleKeywordInputSchema = z.object({
  keyword: z.string().describe('The keyword from the Preamble to explain (e.g., SOVEREIGN, SECULAR).'),
});
export type ExplainPreambleKeywordInput = z.infer<typeof ExplainPreambleKeywordInputSchema>;

const ExplainPreambleKeywordOutputSchema = z.object({
  explanation: z.string().describe('A detailed explanation of the keyword\'s meaning, significance, and context within the Indian Constitution.'),
});
export type ExplainPreambleKeywordOutput = z.infer<typeof ExplainPreambleKeywordOutputSchema>;

export async function explainPreambleKeyword(input: ExplainPreambleKeywordInput): Promise<ExplainPreambleKeywordOutput> {
  return explainPreambleKeywordFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainPreambleKeywordPrompt',
  input: {schema: ExplainPreambleKeywordInputSchema},
  output: {schema: ExplainPreambleKeywordOutputSchema},
  prompt: `You are an expert on the Indian Constitution.
  
  Explain the meaning and significance of the keyword "{{keyword}}" as it is used in the Preamble of the Constitution of India.
  
  Provide a clear, detailed, and concise explanation that covers:
  1.  The literal definition of the term in this context.
  2.  Its historical significance and why the framers included it.
  3.  How it has been interpreted by the Supreme Court of India in any landmark cases.

  Structure your response in well-formed paragraphs.
  `,
});

const explainPreambleKeywordFlow = ai.defineFlow(
  {
    name: 'explainPreambleKeywordFlow',
    inputSchema: ExplainPreambleKeywordInputSchema,
    outputSchema: ExplainPreambleKeywordOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
