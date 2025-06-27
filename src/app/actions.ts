'use server';

import { articleSummary } from '@/ai/flows/article-summary';
import { explainViolationPunishments } from '@/ai/flows/violation-punishments';
import { legalRecourseExplanation } from '@/ai/flows/legal-recourse-explanation';
import { formSchema, type FormSchema } from '@/lib/schema';

export async function getConstitutionalInfo(data: FormSchema) {
  try {
    const validatedData = formSchema.parse(data);

    const [summaryResult, punishmentsResult] = await Promise.all([
      articleSummary({ articleNumber: validatedData.articleNumber }),
      explainViolationPunishments({ articleNumber: validatedData.articleNumber }),
    ]);

    const legalRecourseResult = await legalRecourseExplanation({
      articleNumber: validatedData.articleNumber,
      articleSummary: summaryResult.summary,
      userExperience: validatedData.userExperience,
    });

    return {
      success: true,
      data: {
        summary: summaryResult.summary,
        punishments: punishmentsResult.punishments,
        legalRecourse: legalRecourseResult.legalRecourseExplanation,
      }
    };
  } catch (error) {
    console.error("AI flow error:", error);
    return {
      success: false,
      error: "An error occurred while fetching information. This could be due to an invalid article number or a network issue. Please check the article number and try again."
    };
  }
}
