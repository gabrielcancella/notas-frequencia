"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";

export function Navigation({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <nav className="flex flex-1 items-center justify-center py-4 border-b border-gray-200">
      <ul className="flex gap-5">
        {children}
      </ul>
    </nav>
  )
}

export function NavigationItem({ href, children }: Readonly<{ href: string; children: string; }>) {
  const pathname = usePathname();
  const [ isActive, setIsActive ] = React.useState(pathname === href);

  React.useEffect(() => {
    setIsActive(pathname === href);
  }, [ pathname, href ]);

  return (
    <li>
      <Link href={href} className={ isActive ? "pointer-events-none" : "" }>
        <Button variant={isActive ? "outline" : "ghost"}>
          {children}
        </Button>
      </Link>
    </li>
  )
}