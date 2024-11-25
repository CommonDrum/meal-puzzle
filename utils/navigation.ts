// utils/navigation.ts
export interface NavItem {
  name: string;
  href: string;
  requiresAuth: boolean;
  public: boolean; // if true, shown to everyone
}

export const navigationConfig: NavItem[] = [
  { name: "About", href: "/about", requiresAuth: false, public: true },
  { name: "Dashboard", href: "/dashboard", requiresAuth: true, public: false },
];

export function getAccessibleRoutes(isAuthenticated: boolean): NavItem[] {
  return navigationConfig.filter(route => 
    (route.public || isAuthenticated) && 
    (!route.requiresAuth || isAuthenticated)
  );
}
