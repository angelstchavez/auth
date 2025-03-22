"use client";

import { createRole } from "@/actions/role-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RoleDefinitionSchema } from "@/schemas/role";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const RoleForm = () => {
  const form = useForm<z.infer<typeof RoleDefinitionSchema>>({
    resolver: zodResolver(RoleDefinitionSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof RoleDefinitionSchema>) => {
    const response = await createRole(values);

    if (response.success) {
      toast.success("Rol registrado exitosamente");
      form.reset();
    } else if (response.error) {
      toast.error(response.error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrar rol</CardTitle>
        <CardDescription>
          Ingrese los datos en el formulario para realizar el registro
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese el nombre"
                        {...field}
                        autoComplete="name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="mt-4">
              Registrar
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        Los roles definen un conjunto de permisos que pueden ser asignados a un
        usuario.
      </CardFooter>
    </Card>
  );
};

export default RoleForm;
