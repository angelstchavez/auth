"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";
import { DEFAULT_DASHBOARD_REDIRECT } from "@/routes";
import { loginSchema } from "@/schemas/login";

const MESSAGES = {
  INVALID_FIELDS: "¡Campos no válidos!",
  INVALID_CREDENTIALS: "Correo electrónico o contraseña incorrectos.",
  EMAIL_SENT: "Correo electrónico enviado!",
  DEFAULT_ERROR: "Algo salió mal. Por favor, inténtalo de nuevo.",
};

export const loginUser = async (data: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: MESSAGES.INVALID_FIELDS, success: "" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_DASHBOARD_REDIRECT,
    });

    return { error: "", success: MESSAGES.EMAIL_SENT };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: MESSAGES.INVALID_CREDENTIALS, success: "" };
        default:
          return { error: MESSAGES.DEFAULT_ERROR, success: "" };
      }
    }
    throw error;
  }
};

export async function SignOutUser() {
  await signOut();
}
