import { z } from "zod";

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "El email es obligatorio")
    .email("El email no es válido"),
});

export type LoginPasswordValues = z.infer<typeof resetPasswordSchema>;
