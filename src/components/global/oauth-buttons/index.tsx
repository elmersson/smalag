"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Github } from "lucide-react";

export const OAuthButtons = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full" onClick={() => onClick("google")}>
        Google
      </Button>
      <Button size="lg" className="w-full" onClick={() => onClick("github")}>
        Github <Github />
      </Button>
    </div>
  );
};
