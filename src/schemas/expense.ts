import { expenseSchema } from "./zod";
import { z } from "zod";

// Schema for expenses - used to validate API requests
export const insertExpenseSchema = expenseSchema.omit({ id: true });

export const insertExpenseParams = expenseSchema
  .extend({
    title: z.coerce.string().min(3).max(50),
    description: z.coerce.string().min(3).max(50),
    note: z.coerce.string().min(3).max(50).optional(),
    amount: z.coerce.number().nonnegative(),
    paid: z.coerce.boolean().default(true).optional(),
    date: z.coerce.date().optional(),
  })
  .omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  });

export const updateExpenseSchema = expenseSchema;

export const updateExpenseParams = updateExpenseSchema
  .extend({
    title: z.coerce.string().min(3).max(50),
    description: z.coerce.string().min(3).max(50),
    note: z.coerce.string().min(3).max(50).optional(),
    amount: z.coerce.number().nonnegative(),
    paid: z.coerce.boolean().default(true).optional(),
    date: z.coerce.date().optional(),
  })
  .omit({
    userId: true,
  });

export const expenseIdSchema = updateExpenseSchema.pick({ id: true });

// Types for expenses - used to type API request params and within Components
export type Expense = z.infer<typeof updateExpenseSchema>;
export type NewExpense = z.infer<typeof insertExpenseSchema>;
export type NewExpenseParams = z.infer<typeof insertExpenseParams>;
export type UpdateExpenseParams = z.infer<typeof updateExpenseParams>;
export type ExpenseId = z.infer<typeof expenseIdSchema>["id"];
