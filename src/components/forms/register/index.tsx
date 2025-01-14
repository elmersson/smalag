"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RegisterFormValues, RegisterSchema } from "./schema";
import { useTransition } from "react";
import { register } from "@/actions/register";
import { OAuthButtons } from "@/components/global/oauth-buttons";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: RegisterFormValues) => {
    startTransition(() => {
      register(data).then((data) => {
        if (data.success) {
          toast.success(data.success);
        }

        if (data.error) {
          toast.error(data.error);
        }
      });
    });
  };
  return (
    <Form {...form}>
      <OAuthButtons />

      <div className="flex flex-row gap-2 items-center ">
        <span className="flex-grow h-[1px] bg-themeTextGray/20" />
        <p className="text-themeTextGray text-sm">or continue using email</p>
        <span className="flex-grow h-[1px] bg-themeTextGray/20" />
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="eg. Jane Doe" type="text" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput id="password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" loading={isPending}>
          Create an account
        </Button>
      </form>
      <p className="text-themeTextGray leading-tight text-sm">
        If you have an account already go to{" "}
        <Link href="/login">
          <Button size="lg" variant="link" className="p-0 font-bold">
            login
          </Button>
        </Link>
      </p>
    </Form>
  );
};

export default RegisterForm;
