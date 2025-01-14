"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginFormValues, LoginSchema } from "./schema";
import { useState, useTransition } from "react";
import { login } from "@/actions/login";
import { OAuthButtons } from "@/components/global/oauth-buttons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
import { toast } from "sonner";

const LoginForm = () => {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl");
  const urlError =
    searchParams?.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different Provider!"
      : "";

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      code: "",
      email: "",
      password: "",
    },
  });

  const { setError } = form;

  const onSubmit = (data: LoginFormValues) => {
    startTransition(() => {
      login(data, callbackUrl).then((data) => {
        if (data?.error) {
          toast.error(data.error);
          setError("email", { message: data.error });
          setError("password", { message: data.error });
        }

        if (data?.success) {
          toast.success(data.success);
        }

        if (data?.twoFactor) {
          toast.success("You are safe and secure");
          setShowTwoFactor(true);
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
        {showTwoFactor ? (
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="two factor code">Two Factor Code</FormLabel>
                <FormControl>
                  <Input id="code" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <div className="space-y-4">
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
                <FormItem className="grid gap-2">
                  <div className="flex justify-between items-center">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Link
                      href="/reset"
                      className="ml-auto inline-block text-sm underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput
                      id="password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <Button className="w-full" loading={isPending}>
          {showTwoFactor ? "Confirm" : "Login"}
        </Button>
        {urlError && <p className="text-red-400">{urlError}</p>}
      </form>

      <p className="text-themeTextGray leading-tight text-sm py-0">
        If you dont have an account already go to{" "}
        <Link href="/register">
          <Button size="lg" variant="link" className="p-0 font-bold">
            register
          </Button>
        </Link>
      </p>
    </Form>
  );
};

export default LoginForm;
