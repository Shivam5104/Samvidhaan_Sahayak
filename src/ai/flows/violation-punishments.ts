'use server';

/**
 * @fileOverview Explains the punishments for violating a specific article of the Indian Constitution.
 *
 * - explainViolationPunishments - A function that explains the punishments for violating a specific article.
 * - ExplainViolationPunishmentsInput - The input type for the explainViolationPunishments function.
 * - ExplainViolationPunishmentsOutput - The return type for the explainViolationPunishments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainViolationPunishmentsInputSchema = z.object({
  articleNumber: z
    .string()
    .describe('The article number of the Indian Constitution.'),
});
export type ExplainViolationPunishmentsInput = z.infer<
  typeof ExplainViolationPunishmentsInputSchema
>;

const ExplainViolationPunishmentsOutputSchema = z.object({
  punishments: z
    .string()
    .describe(
      'A detailed explanation of the punishments for violating the specified article.'
    ),
});
export type ExplainViolationPunishmentsOutput = z.infer<
  typeof ExplainViolationPunishmentsOutputSchema
>;

export async function explainViolationPunishments(
  input: ExplainViolationPunishmentsInput
): Promise<ExplainViolationPunishmentsOutput> {
  return explainViolationPunishmentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainViolationPunishmentsPrompt',
  input: {schema: ExplainViolationPunishmentsInputSchema},
  output: {schema: ExplainViolationPunishmentsOutputSchema},
  prompt: `You are an expert in Indian Constitutional Law.
  Explain the punishments for violating Article {{articleNumber}} of the Indian Constitution. Provide a detailed explanation of the consequences for violators.
  If there are no punishments for violating the article, return that there are no punishments.`,
});

const explainViolationPunishmentsFlow = ai.defineFlow(
  {
    name: 'explainViolationPunishmentsFlow',
    inputSchema: ExplainViolationPunishmentsInputSchema,
    outputSchema: ExplainViolationPunishmentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
