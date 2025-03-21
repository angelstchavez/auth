"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppName } from "@/lib/env";

const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-lg font-bold">
          {AppName}
        </Link>

        <Button asChild>
          <Link href="/auth/login">Iniciar sesión</Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
