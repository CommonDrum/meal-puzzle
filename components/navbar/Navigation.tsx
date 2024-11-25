// components/navbar/Navigation.tsx
import { NavItem, getAccessibleRoutes } from "../../utils/navigation.ts";

interface NavigationProps {
  currentPath: string;
  isAuthenticated: boolean;
}

export function Navigation({ currentPath, isAuthenticated }: NavigationProps) {
  const accessibleRoutes = getAccessibleRoutes(isAuthenticated);

  return (
    <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
      {accessibleRoutes.map((item) => (
        <a
          key={item.href}
          href={item.href}
          class={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
            currentPath === item.href
              ? "border-b-2 border-indigo-500 text-gray-900"
              : "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
          }`}
        >
          {item.name}
        </a>
      ))}
    </div>
  );
}