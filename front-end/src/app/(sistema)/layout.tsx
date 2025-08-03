import { Navigation, NavigationItem } from "@/components/ui/navigation";

export default function SistemaLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (<>
    <header>
      <Navigation>
        <NavigationItem href="/">Dashboard</NavigationItem>
        <NavigationItem href="/alunos">Alunos</NavigationItem>
      </Navigation>
    </header>
    <main className="sm:px-2 md:px-4 xl:px-10 2xl:px-16">
      {children}
    </main>
  </>);
}