import NextAuth, { type Session } from "next-auth";

import authConfig from "@/auth.config";
import {
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  unauthenticatedRoutes,
} from "@/routes";
import type { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth(
  // biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
  (req: NextRequest & { auth: Session | null }): Response | void => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = unauthenticatedRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) return;

    if (isAuthRoute) {
      if (isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return;
    }

    if (!isLoggedIn && !isPublicRoute) {
      return Response.redirect(new URL("/login", nextUrl));
    }
  },
);

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
