import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./actions/user-actions";
import { loginSchema } from "./schemas/login";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateFields = loginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role?.name,
            };
          }
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
