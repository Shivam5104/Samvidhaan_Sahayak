import { z } from "zod";

// Schema for the main user input form
export const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  age: z.coerce.number().min(1, { message: 'Please enter a valid age.' }).max(120),
  phone: z.string().optional(),
  profession: z.string().optional(),
  articleNumber: z.string().min(1, { message: 'Article number is required.' }),
  userExperience: z.string().min(20, { message: 'Description must be at least 20 characters.' }),
});

export type FormSchema = z.infer<typeof formSchema>;

// Schema for a single case study
export const CaseStudySchema = z.object({
  caseName: z.string().describe("The name of the court case, e.g., 'Kesavananda Bharati vs. State of Kerala'."),
  judgmentYear: z.string().describe("The year the judgment was delivered."),
  summary: z.string().describe("A concise summary of the case and its relevance to the provided article and user situation."),
});

export type CaseStudy = z.infer<typeof CaseStudySchema>;

// Schema for the case study flow input
export const CaseStudyInputSchema = z.object({
  articleNumber: z.string().describe('The article number of the Indian Constitution.'),
  userExperience: z.string().describe("A description of the user's experience with discrimination or rights violation."),
});
export type CaseStudyInput = z.infer<typeof CaseStudyInputSchema>;

// Schema for the case study flow output
export const CaseStudyOutputSchema = z.object({
  caseStudies: z.array(CaseStudySchema).describe("An array of 2-3 relevant real-life landmark court cases from India's legal history."),
});
export type CaseStudyOutput = z.infer<typeof CaseStudyOutputSchema>;

// Schema for the combined AI result data structure
export const ConstitutionalInfoSchema = z.object({
  summary: z.string(),
  punishments: z.string(),
  legalRecourse: z.string(),
  caseStudies: z.array(CaseStudySchema),
});
export type ConstitutionalInfo = z.infer<typeof ConstitutionalInfoSchema>;