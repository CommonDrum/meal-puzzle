// components/Layout.tsx
import { ComponentChildren } from "preact";
import NavbarIsland from "../islands/NavbarIsland.tsx";
import { Footer } from "./footer/Footer.tsx";

interface LayoutProps {
  user?: any;
  currentPath: string;
  children: ComponentChildren;
}

export function Layout({ user, currentPath, children }: LayoutProps) {
  return (
    <div class="flex flex-col min-h-screen">
      <NavbarIsland user={user} currentPath={currentPath} />
      <main class="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}