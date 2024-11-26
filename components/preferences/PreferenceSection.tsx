interface PreferenceSectionProps {
  title: string;
  description: string;
  children: preact.ComponentChildren;
}

export function PreferenceSection({ title, description, children }: PreferenceSectionProps) {
  return (
    <div class="py-6">
      <div class="mb-4">
        <h3 class="text-lg font-medium leading-6 text-gray-900">{title}</h3>
        <p class="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      <div class="mt-6 space-y-6">
        {children}
      </div>
    </div>
  );
}