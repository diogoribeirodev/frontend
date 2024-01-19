import * as z from "zod";
import { CompleteUser, relatedUserSchema } from "./index";

export const postSchema = z.object({
  id: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  title: z.string(),
  content: z.string().nullish(),
  published: z.boolean(),
  viewCount: z.number().int(),
  authorId: z.number().int().nullish(),
});

export interface CompletePost extends z.infer<typeof postSchema> {
  author?: CompleteUser | null;
}

/**
 * relatedPostSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPostSchema: z.ZodSchema<CompletePost> = z.lazy(() =>
  postSchema.extend({
    author: relatedUserSchema.nullish(),
  }),
);
