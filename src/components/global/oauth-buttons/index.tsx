"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Github, Google } from "@/icons";

export const OAuthButtons = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2 py-2">
      <Button size="lg" className="w-full" onClick={() => onClick("google")}>
        <Google /> Google
      </Button>
      <Button size="lg" className="w-full" onClick={() => onClick("github")}>
        <Github /> Github
      </Button>
    </div>
  );
};
