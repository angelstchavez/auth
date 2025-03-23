"use client";

import {
  FaHome,
  FaChartBar,
  FaListAlt,
  FaCalendar,
  FaBook,
  FaUsers,
  FaUserCog,
  FaCog,
} from "react-icons/fa";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GalleryVerticalEnd } from "lucide-react";
import { auth } from "@/auth";
import { useEffect, useState } from "react";
import { getAccessModulesByRole } from "@/actions/role-actions";
import { AccessModule } from "@/schemas/role";

const items = [
  {
    title: "Bandeja principal",
    url: "/dashboard",
    icon: FaHome,
    module: "DASHBOARD",
  },
  {
    title: "Estadísticas",
    url: "/dashboard/statistics",
    icon: FaChartBar,
    module: "STATISTICS",
  },
  {
    title: "Asistencias",
    url: "/dashboard/attendances",
    icon: FaListAlt,
    module: "ATTENDANCES",
  },
  {
    title: "Eventos",
    url: "/dashboard/events",
    icon: FaCalendar,
    module: "EVENTS",
  },
  {
    title: "Ministerios",
    url: "/dashboard/ministries",
    icon: FaBook,
    module: "MINISTRIES",
  },
  {
    title: "Visitas",
    url: "/dashboard/visits",
    icon: FaUsers,
    module: "VISITS",
  },
  {
    title: "Personas",
    url: "/dashboard/persons",
    icon: FaUsers,
    module: "PERSONS",
  },
  {
    title: "Usuarios",
    url: "/dashboard/users",
    icon: FaUserCog,
    module: "USERS",
  },
  {
    title: "Configuración",
    url: "/dashboard/settings",
    icon: FaCog,
    module: "SETTINGS",
  },
];

export function AppSidebar() {
  const appName = process.env.NEXT_PUBLIC_APP_NAME;

  const [allowedModules, setAllowedModules] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const session = await auth();
      const role = session?.user?.role;

      if (role) {
        const modulesResponse = await getAccessModulesByRole(role);
        if (modulesResponse.data) {
          setAllowedModules(
            modulesResponse.data.map((module: AccessModule) => module.name)
          );
        }
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  const filteredItems = items.filter((item) =>
    allowedModules.includes(item.module)
  );

  if (isLoading) {
    return (
      <Sidebar>
        <SidebarHeader className="h-16 border-b border-sidebar-border flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <div className="text-2xl font-semibold">{appName}</div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <p>Cargando...</p>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <SidebarHeader className="h-16 border-b border-sidebar-border flex items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="text-2xl font-semibold">{appName}</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Administrar</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="hover:bg-primary/10">
                    <a href={item.url}>
                      <item.icon className="text-primary" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-1">
          <Card className="shadow-none p-1">
            <CardHeader className="p-2">
              <CardTitle className="text-sm m-0">Titulo</CardTitle>
              <CardDescription className="text-xs m-0">
                Descripción
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
