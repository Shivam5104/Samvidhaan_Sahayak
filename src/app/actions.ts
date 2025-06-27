'use server';

import { articleSummary } from '@/ai/flows/article-summary';
import { explainViolationPunishments } from '@/ai/flows/violation-punishments';
import { legalRecourseExplanation } from '@/ai/flows/legal-recourse-explanation';
import { findCaseStudies } from '@/ai/flows/case-study';
import { identifyArticle } from '@/ai/flows/identify-article';
import { formSchema, type FormSchema } from '@/lib/schema';

export async function getConstitutionalInfo(data: FormSchema) {
  try {
    const validatedData = formSchema.parse(data);

    const { articleNumber, reasoning } = await identifyArticle({
      userExperience: validatedData.userExperience
    });

    if (!articleNumber) {
      return {
        success: false,
        error: "We could not identify a relevant constitutional article for your situation. Please try describing it differently."
      }
    }

    const [summaryResult, punishmentsResult, caseStudiesResult] = await Promise.all([
      articleSummary({ articleNumber }),
      explainViolationPunishments({ articleNumber }),
      findCaseStudies({
        articleNumber,
        userExperience: validatedData.userExperience,
      }),
    ]);

    const legalRecourseResult = await legalRecourseExplanation({
      articleNumber,
      articleSummary: summaryResult.summary,
      userExperience: validatedData.userExperience,
    });

    return {
      success: true,
      data: {
        identifiedArticle: { articleNumber, reasoning },
        summary: summaryResult.summary,
        punishments: punishmentsResult.punishments,
        legalRecourse: legalRecourseResult.legalRecourseExplanation,
        caseStudies: caseStudiesResult.caseStudies,
      }
    };
  } catch (error) {
    console.error("AI flow error:", error);
    return {
      success: false,
      error: "An error occurred while analyzing your situation. Please try again."
    };
  }
}
