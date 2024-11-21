"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ResetFormValues, ResetSchema } from "./schema";
import FormItem from "@/components/global/form-inputfield";
import { useState, useTransition } from "react";
import { reset } from "@/actions/reset";

const ResetForm = () => {
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const { handleSubmit, control } = useForm<ResetFormValues>({
    resolver: zodResolver(ResetSchema),
  });

  const onSubmit = (data: ResetFormValues) => {
    setSuccess(undefined);
    setError(undefined);

    startTransition(() => {
      reset(data).then((data) => {
        setSuccess(data.success);
        setError(data?.error);
      });
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormItem
          label={"Email"}
          controlProps={{
            name: "email",
            control: control,
          }}
        />

        <Button className="w-full" loading={isPending}>
          Send reset email
        </Button>
        {success && <p className="text-green-400">{success}</p>}
        {error && <p className="text-red-400">{error}</p>}
      </form>
    </>
  );
};

export default ResetForm;
