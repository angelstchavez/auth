import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "./lib/db";
import authConfig from "./auth.config";
import { getUserById } from "./actions/user-actions";

// Creamos una instancia de NextAuth primero
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

      if (token.roles && session.user) {
        session.user.roles = token.roles as string[];
      }
      if (token.accessModules && session.user) {
        session.user.accessModules = token.accessModules as string[];
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await prisma.user.findUnique({
        where: { id: token.sub },
        include: {
          roles: {
            include: { role: true },
          },
          accessModules: {
            include: { module: true },
          },
        },
      });

      if (!existingUser) return token;

      token.roles = existingUser.roles.map((userRole) => userRole.role.name);
      token.accessModules = existingUser.accessModules.map(
        (userModule) => userModule.module.name
      );

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
