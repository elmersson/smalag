"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RegisterFormValues, RegisterSchema } from "./schema";
import FormItem from "@/components/global/form-inputfield";
import { useState, useTransition } from "react";
import { register } from "@/actions/register";
import { OAuthButtons } from "@/components/global/oauth-buttons";

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const { handleSubmit, control } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(data).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormItem
          label={"Name"}
          controlProps={{
            name: "name",
            control: control,
          }}
        />

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
        <Button className="w-full" loading={isPending}>
          Create an account
        </Button>
        {error && <p className="text-red-400">{error}</p>}
        {success && <p className="text-green-400">{success}</p>}
      </form>
      <OAuthButtons />
    </>
  );
};

export default RegisterForm;
