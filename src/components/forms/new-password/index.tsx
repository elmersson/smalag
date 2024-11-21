"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormItem from "@/components/global/form-inputfield";
import { useState, useTransition } from "react";
import { type NewPasswordFormValues, NewPasswordSchema } from "./schema";
import { newPassword } from "@/actions/new-password";

const NewPasswordForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const { handleSubmit, control } = useForm<NewPasswordFormValues>({
    resolver: zodResolver(NewPasswordSchema),
  });

  const onSubmit = (data: NewPasswordFormValues) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      newPassword(data).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormItem
        label={"Password"}
        type="password"
        controlProps={{
          name: "password",
          control: control,
        }}
      />

      <Button className="w-full" loading={isPending}>
        Submit new password
      </Button>
      {error && <p className="text-red-400">{error}</p>}
      {success && <p className="text-green-400">{success}</p>}
    </form>
  );
};

export default NewPasswordForm;
