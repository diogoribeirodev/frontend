import * as z from "zod";

export * from "./expense";

export const PasswordSchema = z.object({
  password: z
    .string({
      required_error: "Password is required",
    })
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:"<>?~`\-=[\]\\;',./]).{8,}$/,
      {
        message:
          "Password must contain at least 8 characters, one uppercase, one number and one special character.",
      },
    ),
});

export const EmailSchema = z.object({
  email: z
    .string()
    .email({
      message: "Email is required",
    })
    .min(3, {
      message: "Email must be at least 3 characters long",
    })
    .max(65, {
      message: "Email must be at most 65 characters long",
    }),
});

export const NameSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(50, {
      message: "Name must be at most 50 characters long",
    }),
});

export const CodeSchema = z.object({
  code: z.optional(z.string().uuid({ message: "Invalid code" })),
});

export const SignInSchema = EmailSchema.merge(PasswordSchema);

export const SignUpSchema = EmailSchema.merge(PasswordSchema).merge(NameSchema);

export const ResetSchema = EmailSchema;

export const NewPasswordSchema = PasswordSchema.extend({
  confirmPassword: PasswordSchema.shape.password,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const appearanceFormSchema = z.object({
  theme: z
    .enum(["light", "dark"], {
      required_error: "Please select a theme.",
    })
    .default("light"),
});

export type SignInSchema = z.infer<typeof SignInSchema>;
export type SignUpSchema = z.infer<typeof SignUpSchema>;
export type ResetSchema = z.infer<typeof ResetSchema>;
export type CodeSchema = z.infer<typeof CodeSchema>;
export type NewPasswordSchema = z.infer<typeof NewPasswordSchema>;
export type appearanceSchema = z.infer<typeof appearanceFormSchema>;
