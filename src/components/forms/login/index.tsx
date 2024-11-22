"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginFormValues, LoginSchema } from "./schema";
import FormItem from "@/components/global/form-inputfield";
import { useState, useTransition } from "react";
import { login } from "@/actions/login";
import { OAuthButtons } from "@/components/global/oauth-buttons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different Provider!"
      : "";

  const { handleSubmit, control, reset } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    setError(undefined);
    setSuccess(undefined);

    startTransition(() => {
      login(data, callbackUrl)
        .then((data) => {
          if (data?.error) {
            reset();
            setError(data?.error);
          }

          if (data?.success) {
            reset();
            setSuccess(data?.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {showTwoFactor ? (
          <FormItem
            label={"Two Factor Code"}
            controlProps={{
              name: "code",
              control: control,
            }}
          />
        ) : (
          <view className="space-y-4">
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
          </view>
        )}

        <Button className="w-full" loading={isPending}>
          {showTwoFactor ? "Confirm" : "Login"}
        </Button>
        {error ||
          (urlError && <p className="text-red-400">{error || urlError}</p>)}
        {success && <p className="text-green-400">{success}</p>}
      </form>
      <OAuthButtons />
      <div className="flex items-center w-full gap-x-2">
        <Link href="/reset" className="w-full">
          <Button size="lg" className="w-full" variant="link">
            Reset password
          </Button>
        </Link>
        <Link href="/register" className="w-full">
          <Button size="lg" className="w-full" variant="link">
            Sign up
          </Button>
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
