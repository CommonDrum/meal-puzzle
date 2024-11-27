interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div class="mb-4">
      <h2 class="text-xl font-semibold text-gray-900">{title}</h2>
      {subtitle && <p class="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </div>
  );
}