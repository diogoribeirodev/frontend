import * as z from "zod";
import {
  CompletePost,
  relatedPostSchema,
  CompleteExpense,
  relatedExpenseSchema,
} from "./index";

export const userSchema = z.object({
  id: z.number().int(),
  email: z.string(),
  password: z.string(),
  name: z.string(),
});

export interface CompleteUser extends z.infer<typeof userSchema> {
  posts: CompletePost[];
  expenses: CompleteExpense[];
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() =>
  userSchema.extend({
    posts: relatedPostSchema.array(),
    expenses: relatedExpenseSchema.array(),
  }),
);
