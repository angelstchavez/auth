import { z } from "zod";
import { AccountSchema } from "./account";

export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("El correo electrónico no es válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  status: z.boolean().optional().default(true),
  image: z.string().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  accounts: z.array(AccountSchema).optional(),
  roleId: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

export type UserWithoutConfirmPassword = Omit<User, "confirmPassword">;
