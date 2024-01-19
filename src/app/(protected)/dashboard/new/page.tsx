"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CardWrapper } from "@/components/auth/CardWrapper";
import { insertExpenseParams } from "@/schemas";
import {
  categories,
  paymentMethods,
  statuses,
} from "@/components/expenses/data/data";
import { toast } from "sonner";
import { useTransition } from "react";
import ExpenseService from "@/services/expense.service";
import { useRouter } from "next/navigation";
import AuthService from "@/services/auth.service";

type NewExpenseParams = z.infer<typeof insertExpenseParams>;

// This can come from your database or API.
const defaultValues: Partial<NewExpenseParams> = {
  title: "My expense",
  description: "My expense description",
  note: "My expense note",
  amount: 0,
  paid: true,
  date: new Date(),
  category: "OTHER",
  paymentMethod: "OTHER",
};

export default function ExpenseForm() {
  const router  = useRouter();
      const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
     router.push("/auth/signin");
    }

  const form = useForm<NewExpenseParams>({
    resolver: zodResolver(insertExpenseParams),
    defaultValues,
  });

    const [isPending, startTransition] = useTransition();


  function onSubmit(data: NewExpenseParams) {
    startTransition(async() => {
      await ExpenseService.create(data)
        .then(() => {
          toast.success("Expense created!");
          router.push("/dashboard");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    });
  }

  return (
    <CardWrapper
      headerLabel="Expense"
      headerSubtitle="Create an expense."
      backButtonLabel="Back to dashboard"
      backButtonHref="/dashboard"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (€)</FormLabel>
                <FormControl>
                  <Input {...field} type="number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
<FormField
            control={form.control}
            name="paid"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Status</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? statuses.find(
                              (status) => status.value === field.value && status.label,
                            )?.label
                          : "Select Status"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Status..." />
                      <CommandEmpty>No categories found.</CommandEmpty>
                      <CommandGroup>
                        {statuses.map((status) => (
                          <CommandItem
                            value={status.label}
                            key={String(status.value)}
                            onSelect={() => { 
                              form.setValue("paid", status.value as any);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                status.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {status.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Input {...field} type="string" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Payment Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? categories.find(
                              (category) => category.value === field.value,
                            )?.label
                          : "Select Category"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search Category..." />
                      <CommandEmpty>No categories found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            value={category.label}
                            key={category.value}
                            onSelect={() => {
                              form.setValue("category", category.value as any);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                category.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {category.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Payment Method</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? paymentMethods.find(
                              (paymentMethod) =>
                                paymentMethod.value === field.value,
                            )?.label
                          : "Select Category"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search..." />
                      <CommandEmpty>No payment methods found.</CommandEmpty>
                      <CommandGroup>
                        {paymentMethods.map((paymentMethod) => (
                          <CommandItem
                            value={paymentMethod.label}
                            key={paymentMethod.value}
                            onSelect={() => {
                              form.setValue(
                                "paymentMethod",
                                paymentMethod.value as any,
                              );
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                paymentMethod.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                            {paymentMethod.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isPending} type="submit" className="w-full">
            Create expense!
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
}
