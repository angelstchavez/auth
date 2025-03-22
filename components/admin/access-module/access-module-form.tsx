"use client";

import { createAccessModule } from "@/actions/access-module-actions";
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
import { AccessModuleSchema } from "@/schemas/role";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const AccessModuleForm = () => {
  const form = useForm<z.infer<typeof AccessModuleSchema>>({
    resolver: zodResolver(AccessModuleSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AccessModuleSchema>) => {
    const response = await createAccessModule(values);

    if (response.success) {
      toast.success("Modulo de acceso registrado exitosamente");
      form.reset();
    } else if (response.error) {
      toast.error(response.error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrar modulo de acceso</CardTitle>
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
        El módulo de acceso define las funcionalidades o permisos que pueden ser
        asignados a un rol.
      </CardFooter>
    </Card>
  );
};

export default AccessModuleForm;
