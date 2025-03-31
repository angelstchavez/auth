"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { associateModulesToRole, getRoles } from "@/actions/role-actions";
import { getAccessModules } from "@/actions/access-module-actions";
import { RoleAccessModuleSchema } from "@/schemas/role";

const RoleAccessForm = () => {
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]);
  const [modules, setModules] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<z.infer<typeof RoleAccessModuleSchema>>({
    resolver: zodResolver(RoleAccessModuleSchema),
    defaultValues: { roleId: "", moduleIds: [] },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rolesRes = await getRoles();
        const modulesRes = await getAccessModules();

        if (rolesRes.data) setRoles(rolesRes.data);
        if (modulesRes.data) setModules(modulesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error al cargar los datos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (values: z.infer<typeof RoleAccessModuleSchema>) => {
    const response = await associateModulesToRole(values);

    if (response.success) {
      toast.success("Módulos asignados exitosamente");
      form.reset();
    } else if (response.error) {
      toast.error(response.error);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Asociar Módulos a Rol</CardTitle>
          <CardDescription>
            Seleccione un rol y los módulos a asignar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Cargando...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Asociar Módulos a Rol</CardTitle>
        <CardDescription>
          Seleccione un rol y los módulos a asignar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="roleId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rol</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Seleccione un rol" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="moduleIds"
              render={() => (
                <FormItem>
                  <FormLabel>Módulos de acceso</FormLabel>
                  {modules.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No se encontraron módulos registrados.
                    </p>
                  ) : (
                    <div className="grid gap-2">
                      {modules.map((module) => (
                        <FormField
                          key={module.id}
                          control={form.control}
                          name="moduleIds"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3">
                              <FormControl>
                                <Checkbox
                                  checked={field.value.includes(module.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          module.id,
                                        ])
                                      : field.onChange(
                                          field.value.filter(
                                            (id) => id !== module.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {module.name}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Registrar</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RoleAccessForm;
