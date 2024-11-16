"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginFormValues, LoginSchema } from "./schema";
import FormItem from "@/components/global/form-inputfield";
import { useState, useTransition } from "react";
import { login } from "@/actions/login";

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const { handleSubmit, control } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(data).then((data) => {
        setError(data?.error);
      });
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormItem
        label={"Email"}
        controlProps={{
          name: "email",
          control: control,
        }}
      />
      <FormItem
        label={"Password"}
        type="password"
        controlProps={{
          name: "password",
          control: control,
        }}
      />
      <Button className="w-full" disabled={isPending}>
        Login
      </Button>
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}
    </form>
  );
};

export default LoginForm;
