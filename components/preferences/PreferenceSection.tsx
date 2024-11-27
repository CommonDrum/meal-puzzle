// components/preferences/PreferenceSection.tsx
interface PreferenceSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export const PreferenceSection = ({
  title,
  description,
  children,
  className = ""
}: PreferenceSectionProps) => (
  <section
    className={`space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-200 
                transition-shadow duration-200 hover:shadow-sm ${className}`}
    aria-labelledby={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
  >
    <div className="space-y-1">
      <h3
        id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
        className="text-lg font-medium text-gray-900"
      >
        {title}
      </h3>
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
    {children}
  </section>
);