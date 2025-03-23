import * as z from "zod";
import { AccountSchema } from "./account";

export const UserSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().min(1, "El nombre es requerido"),
    email: z.string().email("El correo electrónico no es válido"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirmPassword: z
      .string()
      .min(8, "La confirmación de la contraseña es requerida"),
    status: z.boolean().optional().default(true),
    image: z.string().nullable().optional(),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    accounts: z.array(AccountSchema).optional(),
    role: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type User = z.infer<typeof UserSchema>;
