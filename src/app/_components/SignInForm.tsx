"use client";

import { useForm } from "react-hook-form";
import { useEffect, useTransition } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import AuthService from "@/services/auth.service";

export const SignInForm = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get(decodeURI("error")) ?? null;
  const success = searchParams.get(decodeURI("success")) ?? null;
  const description = searchParams.get(decodeURI("description")) ?? null;
  const router = useRouter();

  useEffect(() => {
    if (error && description) {
      toast.error(error, { description });
    } else if (success && description) {
      toast.success(success, { description });
    } else {
      return;
    }
    router.push("/auth/signin");
  });

  const [isPending, startTransition] = useTransition();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignInSchema) => {
    startTransition(async () => {
      await AuthService.signin(values)
        .then(() => {
          router.push("/dashboard");
        })
        .catch(function (error) {
          toast.error(error.response.data.error ?? "Something went wrong!", {
            description: error.response.data.description ?? null,
          });
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      headerSubtitle="Sign in to your account to continue."
      backButtonLabel="Don't have an account? Sign up."
      backButtonHref="/auth/signup"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="john.doe@example.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="******"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          </div>
          <Button disabled={isPending} type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
