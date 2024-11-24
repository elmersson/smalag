"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { type NewPasswordFormValues, NewPasswordSchema } from "./schema";
import { newPassword } from "@/actions/new-password";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const NewPasswordForm = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<NewPasswordFormValues>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const { setError } = form;

  const onSubmit = (values: NewPasswordFormValues) => {
    startTransition(() => {
      newPassword(values, token).then((data) => {
        if (data.success) {
          toast.success(data.success);
          router.push("/login");
        }

        if (data.error) {
          setError("password", { message: data.error });
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
          name="password"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="password">Password</FormLabel>

              <FormControl>
                <PasswordInput id="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" loading={isPending}>
          Submit new password
        </Button>
      </form>
    </Form>
  );
};

export default NewPasswordForm;
