import Link from "next/link";

export function Navigation({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <nav className="flex flex-1 items-center justify-center py-4 mb-4 border-b border-gray-200">
      <ul className="flex gap-5">
        {children}
      </ul>
    </nav>
  )
}

export function NavigationItem({ href, children }: Readonly<{ href: string; children: React.ReactNode; }>) {
  return (
    <li>
      <Link href={href}>{children}</Link>
    </li>
  )
}