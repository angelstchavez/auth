import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role?: string;
      accessModules?: string[];
    } & User;
  }

  interface User {
    role?: string;
    accessModules?: string[];
  }
}

declare module "@auth/prisma-adapter" {
  interface AdapterUser {
    role?: string;
    accessModules?: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    accessModules?: string[];
  }
}
