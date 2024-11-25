// components/footer/FooterLink.tsx
interface FooterLinkProps {
  href: string;
  children: string;
}

export function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <a
      href={href}
      class="text-gray-600 hover:text-indigo-600 transition-colors"
    >
      {children}
    </a>
  );
}