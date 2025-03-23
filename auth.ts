import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "./lib/db";
import authConfig from "./auth.config";
import { getUserById } from "./actions/user-actions";

const nextAuthInstance = NextAuth({
  callbacks: {
    async signIn({ user }) {
      if (!user.id) return false;

      const existingUser = await getUserById(user.id);
      if (!existingUser || !existingUser.status) return false;

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (token.accessModules && session.user) {
        session.user.accessModules = token.accessModules as string[];
      }

      console.log("Session user:", session.user);
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await prisma.user.findUnique({
        where: { id: token.sub },
        include: {
          role: {
            include: {
              modules: {
                include: { module: true },
              },
            },
          },
        },
      });

      if (!existingUser) return token;

      token.role = existingUser.role?.name ?? undefined;

      token.accessModules =
        existingUser.role?.modules.map(
          (roleModule) => roleModule.module.name
        ) ?? [];

      console.log("JWT token:", token);
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});

export const handlers = nextAuthInstance.handlers;
export const auth = nextAuthInstance.auth;
export const signIn = nextAuthInstance.signIn;
export const signOut = nextAuthInstance.signOut;
