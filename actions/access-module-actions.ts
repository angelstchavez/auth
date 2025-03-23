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
  MODULE_EXISTS: "Ya existe un módulo con ese nombre.",
  CREATION_SUCCESS: "Módulo creado exitosamente.",
  CREATION_ERROR: "Error al crear el módulo.",
  UPDATE_SUCCESS: "Módulo actualizado exitosamente.",
  UPDATE_ERROR: "Error al actualizar el módulo.",
  DELETE_SUCCESS: "Módulo eliminado exitosamente.",
  DELETE_ERROR: "Error al eliminar el módulo.",
  NOT_FOUND: "Módulo no encontrado.",
};

export const createAccessModule = async (moduleData: {
  name: string;
}): Promise<ResponseMessage> => {
  try {
    if (!moduleData.name) {
      return { error: "El nombre del módulo es requerido." };
    }

    const existingModule = await prisma.accessModule.findUnique({
      where: { name: moduleData.name },
    });

    if (existingModule) {
      return { error: MESSAGES.MODULE_EXISTS };
    }

    const newModule = await prisma.accessModule.create({
      data: {
        name: moduleData.name,
      },
    });

    return { success: MESSAGES.CREATION_SUCCESS, data: newModule };
  } catch (error) {
    console.error("Error al crear el módulo:", error);
    return { error: MESSAGES.CREATION_ERROR };
  }
};

export const updateAccessModule = async (
  moduleId: string,
  moduleData: { name: string }
): Promise<ResponseMessage> => {
  try {
    const existingModule = await prisma.accessModule.findUnique({
      where: { id: moduleId },
    });

    if (!existingModule) {
      return { error: MESSAGES.NOT_FOUND };
    }

    const updatedModule = await prisma.accessModule.update({
      where: { id: moduleId },
      data: {
        name: moduleData.name,
      },
    });

    return { success: MESSAGES.UPDATE_SUCCESS, data: updatedModule };
  } catch (error) {
    console.error("Error al actualizar el módulo:", error);
    return { error: MESSAGES.UPDATE_ERROR };
  }
};

export const deleteAccessModule = async (
  moduleId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    await prisma.accessModule.delete({ where: { id: moduleId } });
    return { success: true };
  } catch (error) {
    console.error("Error al eliminar el módulo:", error);
    return { success: false, error: MESSAGES.DELETE_ERROR };
  }
};

export const getAccessModuleById = async (moduleId: string) => {
  try {
    const accessModule = await prisma.accessModule.findUnique({
      where: { id: moduleId },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return accessModule;
  } catch {
    return null;
  }
};

export const getAccessModuleByName = async (name: string) => {
  try {
    const accessModule = await prisma.accessModule.findUnique({
      where: { name },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return accessModule;
  } catch {
    return null;
  }
};

export const getAccessModules = async (): Promise<ResponseMessage> => {
  try {
    const modules = await prisma.accessModule.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        roles: {
          select: {
            role: {
              select: {
                id: true,
                name: true,
                users: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return { data: modules };
  } catch (error) {
    console.error("Error al obtener los módulos:", error);
    return { error: MESSAGES.NOT_FOUND };
  }
};

export const getTotalAccessModules = async () => {
  try {
    const modules = await prisma.accessModule.count();
    return modules;
  } catch (error) {
    console.error("Error fetching total modules:", error);
    return 0;
  }
};
