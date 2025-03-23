/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

type ResponseMessage<T = any> = {
  success?: string;
  error?: string;
  data?: T;
};

const MESSAGES = {
  INVALID_FIELDS: "Campos no válidos.",
  USER_EXISTS: "Ya existe un usuario con ese correo electrónico.",
  CREATION_SUCCESS: "Usuario creado exitosamente.",
  CREATION_ERROR: "Error al crear el usuario.",
  UPDATE_SUCCESS: "Usuario actualizado exitosamente.",
  UPDATE_ERROR: "Error al actualizar el usuario.",
  DELETE_SUCCESS: "Usuario eliminado exitosamente.",
  DELETE_ERROR: "Error al eliminar el usuario.",
  NOT_FOUND: "Usuario no encontrado.",
};

export const createUser = async (userData: {
  name: string | null;
  email: string;
  password: string;
  role?: string;
}): Promise<ResponseMessage> => {
  try {
    if (!userData.email) {
      return { error: "El correo electrónico es requerido." };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      return { error: MESSAGES.USER_EXISTS };
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    let roleId: string | undefined;
    if (userData.role) {
      const role = await prisma.roleDefinition.findUnique({
        where: { name: userData.role },
      });

      if (!role) {
        const newRole = await prisma.roleDefinition.create({
          data: { name: userData.role },
        });
        roleId = newRole.id;
      } else {
        roleId = role.id;
      }
    }

    const newUser = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        status: true,
        roleId: roleId,
      },
    });

    return { success: MESSAGES.CREATION_SUCCESS, data: newUser };
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    return { error: MESSAGES.CREATION_ERROR };
  }
};

export const updateUser = async (
  userId: string,
  userData: {
    name?: string | null;
    email?: string;
    password?: string;
    role?: string;
  }
): Promise<ResponseMessage> => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return { error: MESSAGES.NOT_FOUND };
    }

    if (userData.email && userData.email !== existingUser.email) {
      const userWithSameEmail = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (userWithSameEmail) {
        return { error: MESSAGES.USER_EXISTS };
      }
    }

    let hashedPassword: string | undefined;
    if (userData.password) {
      hashedPassword = await bcrypt.hash(userData.password, 10);
    }

    let roleId: string | undefined;
    if (userData.role) {
      const role = await prisma.roleDefinition.findUnique({
        where: { name: userData.role },
      });

      if (!role) {
        const newRole = await prisma.roleDefinition.create({
          data: { name: userData.role },
        });
        roleId = newRole.id;
      } else {
        roleId = role.id;
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: userData.name !== undefined ? userData.name : existingUser.name,
        email:
          userData.email !== undefined ? userData.email : existingUser.email,
        password:
          hashedPassword !== undefined ? hashedPassword : existingUser.password,
        roleId: roleId !== undefined ? roleId : existingUser.roleId,
      },
    });

    return { success: MESSAGES.UPDATE_SUCCESS, data: updatedUser };
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    return { error: MESSAGES.UPDATE_ERROR };
  }
};

export const deleteUserHandler = async (
  userId: string
): Promise<{ success: boolean; error?: string }> => {
  try {
    await prisma.user.delete({ where: { id: userId } });
    return { success: true };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, error: MESSAGES.DELETE_ERROR };
  }
};

export const getUserById = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        role: true,
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: {
          include: {
            modules: {
              include: {
                module: true,
              },
            },
          },
        },
      },
    });

    return user;
  } catch {
    return null;
  }
};

export const getUsers = async (): Promise<ResponseMessage> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return { data: users };
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    return { error: MESSAGES.NOT_FOUND };
  }
};

export const getTotalUsers = async () => {
  try {
    const users = await prisma.user.count();
    return users;
  } catch (error) {
    console.error("Error fetching total users:", error);
    return 0;
  }
};
