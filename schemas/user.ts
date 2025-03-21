import * as z from "zod";

const RoleSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
});

const AccessModuleSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
});

export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("El correo electrónico no es válido"),
  emailVerified: z.date().nullable().optional(),
  image: z.string().nullable().optional(),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  status: z.boolean().optional().default(true),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  roles: z.array(RoleSchema).optional(),
  accessModules: z.array(AccessModuleSchema).optional(),
});

export type User = z.infer<typeof UserSchema>;
