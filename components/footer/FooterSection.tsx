// components/footer/FooterSection.tsx
interface FooterSectionProps {
  title: string;
  children: preact.ComponentChildren;
}

export function FooterSection({ title, children }: FooterSectionProps) {
  return (
    <div class="space-y-4">
      <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase">
        {title}
      </h3>
      <div class="flex flex-col space-y-3">
        {children}
      </div>
    </div>
  );
}
