"use client";

import { newVerification } from "@/actions/new-verification";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { type VerificationFormValues, VerificationSchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { toast } from "sonner";

const NewVerificationForm = () => {
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(VerificationSchema),
    defaultValues: {
      token: token || "",
    },
  });

  const { setValue } = form;

  useEffect(() => {
    if (!token) {
      toast.error("Missing token!");
      return;
    }

    setValue("token", token);

    startTransition(() => {
      newVerification(token).then((data) => {
        if (data.success) {
          toast.success(data.success);
        }
        if (data.error) {
          toast.error(data.error);
        }
      });
    });
  }, [token, setValue]);

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form className="mb-4">
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token</FormLabel>
                <FormControl>
                  <input
                    type="text"
                    placeholder="Verification token"
                    {...field}
                    className="input"
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <Link href="/login">
        <Button className="w-full" loading={isPending}>
          Back to login
        </Button>
      </Link>
    </div>
  );
};

export default NewVerificationForm;
