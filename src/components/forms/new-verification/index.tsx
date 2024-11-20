"use client";

import { newVerification } from "@/actions/new-verification";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useCallback, useState, useTransition } from "react";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    startTransition(() => {
      newVerification(token)
        .then((data) => {
          setSuccess(data.success);
          setError(data.error);
        })
        .catch(() => {
          setError("Something went wrong!");
        });
    });
  }, [token, success, error]);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <p>{token}</p>
      <Button className="w-full" loading={isPending}>
        Back to login
      </Button>
      {error && <p className="text-red-400">{error}</p>}
      {success && <p className="text-green-400">{success}</p>}
    </form>
  );
};

export default NewVerificationForm;
