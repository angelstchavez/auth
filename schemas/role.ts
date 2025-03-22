import { z } from "zod";

export const AccessModuleSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, "El nombre es requerido."),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const UserAccessModuleSchema = z.object({
  userId: z.string().min(1, "El ID del usuario es requerido."),
  moduleId: z.string().min(1, "El ID del módulo es requerido."),
  assignedAt: z.date().optional(),
});

export const RoleDefinitionSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1, "El nombre del rol es requerido."),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const UserRoleSchema = z.object({
  userId: z.string().min(1, "El ID del usuario es requerido."),
  roleId: z.string().min(1, "El ID del rol es requerido."),
  assignedAt: z.date().optional(),
});

export const RoleAccessModuleSchema = z.object({
  roleId: z.string().min(1, "El ID del rol es requerido."),
  moduleIds: z.array(z.string().min(1, "El ID del módulo es requerido.")),
});

export type AccessModule = z.infer<typeof AccessModuleSchema>;
export type UserAccessModule = z.infer<typeof UserAccessModuleSchema>;
export type RoleDefinition = z.infer<typeof RoleDefinitionSchema>;
export type UserRole = z.infer<typeof UserRoleSchema>;
export type RoleAccessModule = z.infer<typeof RoleAccessModuleSchema>;
