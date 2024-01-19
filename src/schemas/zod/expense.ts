import * as z from "zod";
import { CompleteUser, relatedUserSchema } from "./index";

const PaymentMethods = ["CASH", "CARD", "TRANSFER", "OTHER"] as const;

const Categories = ["FOOD", "TRANSPORT", "ENTERTAINMENT", "OTHER"] as const;

export const expenseSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string(),
  description: z.string(),
  amount: z.number().int(),
  paid: z.boolean(),
  paymentMethod: z.enum(PaymentMethods).nullish(),
  note: z.string().nullish(),
  date: z.date().nullish(),
  category: z.enum(Categories).nullish(),
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
