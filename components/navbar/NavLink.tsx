interface NavLinkProps {
  href: string;
  children: string;
  active?: boolean;
}

export function NavLink({ href, children, active }: NavLinkProps) {
  const baseStyles = "relative px-3 py-2 text-sm transition-colors";
  const activeStyles = "text-gray-900 font-medium after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-gray-900 after:rounded-full";
  const inactiveStyles = "text-gray-600 hover:text-gray-900";

  return (
    <a 
      href={href} 
      class={`${baseStyles} ${active ? activeStyles : inactiveStyles}`}
    >
      {children}
    </a>
  );
}