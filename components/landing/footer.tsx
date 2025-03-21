"use client";

import { AppName } from "@/lib/env";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t py-6">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
        <p className="text-sm text-neutral-600">
          © {new Date().getFullYear()} {AppName}. Todos los derechos reservados.
        </p>

        <nav className="flex items-center gap-4">
          <Link
            href="/terms-of-service"
            className="text-sm text-neutral-400 hover:text-neutral-100"
          >
            Términos de Servicio
          </Link>
          <Link
            href="/privacy-policy"
            className="text-sm text-neutral-400 hover:text-neutral-100"
          >
            Política de Privacidad
          </Link>
        </nav>
      </div>
    </footer>
  );
}
