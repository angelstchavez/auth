import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      roles?: string[];
      accessModules?: string[];
    } & User;
  }

  interface User {
    roles?: string[];
    accessModules?: string[];
  }
}

declare module "@auth/prisma-adapter" {
  interface AdapterUser {
    roles?: string[];
    accessModules?: string[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    roles?: string[];
    accessModules?: string[];
  }
}
