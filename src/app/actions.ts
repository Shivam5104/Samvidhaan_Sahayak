'use server';

import { articleSummary } from '@/ai/flows/article-summary';
import { explainViolationPunishments } from '@/ai/flows/violation-punishments';
import { legalRecourseExplanation } from '@/ai/flows/legal-recourse-explanation';
import { findCaseStudies } from '@/ai/flows/case-study';
import { identifyArticle } from '@/ai/flows/identify-article';
import { compareArticles, type CompareArticlesInput } from '@/ai/flows/compare-articles';
import { explainPreambleKeyword } from '@/ai/flows/explain-preamble-keyword';
import { textToSpeech } from '@/ai/flows/text-to-speech';
import { formSchema, type FormSchema } from '@/lib/schema';
import { z } from 'zod';

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

const compareArticlesActionSchema = z.object({
  articleOne: z.string(),
  articleTwo: z.string(),
})
export async function compareArticlesAction(data: CompareArticlesInput) {
  try {
    const validatedData = compareArticlesActionSchema.parse(data);
    const result = await compareArticles(validatedData);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("AI flow error:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid input. Please ensure you have entered both article numbers.",
      }
    }
    return {
      success: false,
      error: "An error occurred while comparing the articles. Please try again.",
    };
  }
}

const explainPreambleKeywordActionSchema = z.string().min(1);
export async function explainPreambleKeywordAction(keyword: string) {
  try {
    const validatedKeyword = explainPreambleKeywordActionSchema.parse(keyword);
    const result = await explainPreambleKeyword({ keyword: validatedKeyword });
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("AI flow error:", error);
     if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid keyword provided.",
      }
    }
    return {
      success: false,
      error: "An error occurred while fetching the explanation. Please try again.",
    };
  }
}

const textToSpeechActionSchema = z.string().min(1);
export async function textToSpeechAction(text: string) {
  try {
    const validatedText = textToSpeechActionSchema.parse(text);
    const result = await textToSpeech(validatedText);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("TTS flow error:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: "Invalid text provided for speech synthesis.",
      }
    }
    return {
      success: false,
      error: "An error occurred while generating audio. Please try again.",
    };
  }
}
