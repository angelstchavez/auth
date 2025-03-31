"use client";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NotFoundPage = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <CardTitle>404 - Recurso no encontrado</CardTitle>

          <div className="space-y-2">
            <CardDescription className="text-sm">
              <span className="font-medium">Ruta solicitada:</span>
              <span className="ml-1 font-mono">{pathname}</span>
            </CardDescription>

            <CardDescription>
              Lo sentimos, no pudimos encontrar el contenido que estás buscando.
              Esto puede deberse a:
              <ul className="list-disc pl-5 text-sm space-y-1 mt-2">
                <li>Un enlace desactualizado o incorrecto</li>
                <li>Un error al escribir la URL</li>
                <li>Que el recurso haya sido movido o eliminado</li>
              </ul>
            </CardDescription>
          </div>
        </CardHeader>

        <CardFooter className="border-t pt-4">
          <Link
            href="/"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Volver a la página principal
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotFoundPage;
