import * as z from "zod";
import { PaymentMethod, Category } from "@prisma/client";
import { CompleteUser, relatedUserSchema } from "./index";

export const expenseSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string(),
  description: z.string(),
  amount: z.number().int(),
  paid: z.boolean(),
  paymentMethod: z.nativeEnum(PaymentMethod).nullish(),
  note: z.string().nullish(),
  date: z.date().nullish(),
  category: z.nativeEnum(Category).nullish(),
  userId: z.number().int(),
});

export interface CompleteExpense extends z.infer<typeof expenseSchema> {
  user: CompleteUser;
}

/**
 * relatedExpenseSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedExpenseSchema: z.ZodSchema<CompleteExpense> = z.lazy(() =>
  expenseSchema.extend({
    user: relatedUserSchema,
  }),
);
