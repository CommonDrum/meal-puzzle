// components/navbar/Navigation.tsx
import { NavLink } from "./NavLink.tsx";

interface NavigationProps {
  currentPath: string;
}

export function Navigation({ currentPath }: NavigationProps) {
  return (
    <div class="hidden md:flex items-center space-x-2">
      <NavLink href="/" active={currentPath === "/"}>
        Dashboard
      </NavLink>
      <NavLink href="/explore" active={currentPath === "/explore"}>
        Explore
      </NavLink>
      <NavLink href="/learn" active={currentPath === "/learn"}>
        Learn
      </NavLink>
    </div>
  );
}