/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ResponseMessage<T = any> = {
  success?: string;
  error?: string;
  data?: T;
};

const MESSAGES = {
  INVALID_FIELDS: "Campos no válidos.",
  ROLE_EXISTS: "Ya existe un rol con ese nombre.",
  CREATION_SUCCESS: "Rol creado exitosamente.",
  CREATION_ERROR: "Error al crear el rol.",
  UPDATE_SUCCESS: "Rol actualizado exitosamente.",
  UPDATE_ERROR: "Error al actualizar el rol.",
  DELETE_SUCCESS: "Rol eliminado exitosamente.",
  DELETE_ERROR: "Error al eliminar el rol.",
  NOT_FOUND: "Rol no encontrado.",
  USER_ROLE_ASSIGNED: "Rol asignado al usuario exitosamente.",
  USER_ROLE_REMOVED: "Rol removido del usuario exitosamente.",
  USER_ROLE_ERROR: "Error al asignar o remover el rol del usuario.",
  MODULES_ASSIGNED: "Módulos asociados al rol exitosamente.",
  MODULES_ASSIGN_ERROR: "Error al asociar los módulos al rol.",
};

export const createRole = async (roleData: {
  name: string;
}): Promise<ResponseMessage> => {
  try {
    if (!roleData.name) {
      return { error: "El nombre del rol es requerido." };
    }

    const existingRole = await prisma.roleDefinition.findUnique({
      where: { name: roleData.name },
    });

    if (existingRole) {
      return { error: MESSAGES.ROLE_EXISTS };
    }

    const newRole = await prisma.roleDefinition.create({
      data: {
        name: roleData.name,
      },
    });

    return { success: MESSAGES.CREATION_SUCCESS, data: newRole };
  } catch (error) {
    console.error("Error al crear el rol:", error);
    return { error: MESSAGES.CREATION_ERROR };
  }
};

export const updateRole = async (
  roleId: string,
  roleData: { name: string }
): Promise<ResponseMessage> => {
  try {
    const existingRole = await prisma.roleDefinition.findUnique({
      where: { id: roleId },
    });

    if (!existingRole) {
      return { error: MESSAGES.NOT_FOUND };
    }

    const updatedRole = await prisma.roleDefinition.update({
      where: { id: roleId },
      data: {
        name: roleData.name,
      },
    });

    return { success: MESSAGES.UPDATE_SUCCESS, data: updatedRole };
  } catch (error) {
    console.error("Error al actualizar el rol:", error);
    return { error: MESSAGES.UPDATE_ERROR };
  }
};

export const deleteRole = async (
  roleId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    await prisma.roleDefinition.delete({ where: { id: roleId } });
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar el rol:", error);
    return { success: false, error: MESSAGES.DELETE_ERROR };
  }
};

export const getRoleById = async (roleId: string) => {
  try {
    const role = await prisma.roleDefinition.findUnique({
      where: { id: roleId },
      include: {
        users: true,
      },
    });

    return role;
  } catch {
    return null;
  }
};

export const getRoleByName = async (name: string) => {
  try {
    const role = await prisma.roleDefinition.findUnique({
      where: { name },
      include: {
        users: true,
      },
    });

    return role;
  } catch {
    return null;
  }
};

export async function getRoleName(roleId: string) {
  return await prisma.roleDefinition.findUnique({
    where: { id: roleId },
    select: { name: true },
  });
}

export const getRoles = async (): Promise<ResponseMessage> => {
  try {
    const roles = await prisma.roleDefinition.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return { data: roles };
  } catch (error) {
    console.error("Error al obtener los roles:", error);
    return { error: MESSAGES.NOT_FOUND };
  }
};

export const getTotalRoles = async () => {
  try {
    const roles = await prisma.roleDefinition.count();
    return roles;
  } catch (error) {
    console.error("Error fetching total roles:", error);
    return 0;
  }
};

export const associateModulesToRole = async (data: {
  roleId: string;
  moduleIds: string[];
}): Promise<ResponseMessage> => {
  try {
    await prisma.roleAccessModule.createMany({
      data: data.moduleIds.map((moduleId) => ({
        roleId: data.roleId,
        moduleId,
      })),
    });

    return { success: MESSAGES.MODULES_ASSIGNED };
  } catch (error) {
    console.error("Error al asociar módulos al rol:", error);
    return { error: MESSAGES.MODULES_ASSIGN_ERROR };
  }
};

export const getAccessModulesByRole = async (
  roleId: string
): Promise<ResponseMessage> => {
  try {
    const roleWithModules = await prisma.roleDefinition.findUnique({
      where: { id: roleId },
      include: {
        modules: {
          include: {
            module: true,
          },
        },
      },
    });

    if (!roleWithModules) {
      return { error: "Rol no encontrado." };
    }

    const accessModules = roleWithModules.modules.map(
      (roleModule) => roleModule.module
    );

    return { data: accessModules };
  } catch (error) {
    console.error("Error al obtener los módulos de acceso:", error);
    return { error: "Error al obtener los módulos de acceso." };
  }
};
