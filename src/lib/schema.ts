import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  age: z.coerce.number().min(1, { message: 'Please enter a valid age.' }).max(120),
  phone: z.string().optional(),
  profession: z.string().optional(),
  articleNumber: z.string().min(1, { message: 'Article number is required.' }),
  userExperience: z.string().min(20, { message: 'Description must be at least 20 characters.' }),
});

export type FormSchema = z.infer<typeof formSchema>;
