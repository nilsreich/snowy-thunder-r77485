"use client";

import { usePathname, useRouter } from "@/lib/navigation";

import Link from "next/link";
import { i18n } from "@/lib/i18n-config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FlagIcon } from "lucide-react";

export const LocaleSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();
  const redirectedPathName = (locale: string) => {
    router.replace(pathname, { locale: locale });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <FlagIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => redirectedPathName("de")}>
          de
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => redirectedPathName("en")}>
          en
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
