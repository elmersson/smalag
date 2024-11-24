"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ResetFormValues, ResetSchema } from "./schema";
import { useTransition } from "react";
import { reset } from "@/actions/reset";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const ResetForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ResetFormValues>({
    resolver: zodResolver(ResetSchema),
    defaultValues: { email: "" },
  });

  const { setError } = form;

  const onSubmit = (data: ResetFormValues) => {
    startTransition(() => {
      reset(data).then((data) => {
        if (data.success) {
          toast.success(data.success);
        }

        if (data.error) {
          setError("email", { message: data.error });
          toast.error(data.error);
        }
      });
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  placeholder="eg. janedoe@mail.com"
                  type="email"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" loading={isPending}>
          Send reset email
        </Button>
      </form>
    </Form>
  );
};

export default ResetForm;
