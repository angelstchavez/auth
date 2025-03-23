import NextAuth from "next-auth";
import authConfig from "./auth.config";

import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  DEFAULT_LOGIN_REDIRECT,
  DEFAULT_ADMIN_REDIRECT,
} from "./routes";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      const redirectPath =
        userRole === "ADMIN" ? DEFAULT_ADMIN_REDIRECT : DEFAULT_LOGIN_REDIRECT;

      return Response.redirect(new URL(redirectPath, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute && nextUrl.pathname !== "/auth/login") {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  if (
    isLoggedIn &&
    userRole === "ADMIN" &&
    !nextUrl.pathname.startsWith("/admin")
  ) {
    return Response.redirect(new URL(DEFAULT_ADMIN_REDIRECT, nextUrl));
  }

  if (
    isLoggedIn &&
    userRole !== "ADMIN" &&
    nextUrl.pathname.startsWith("/admin")
  ) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  return;
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
