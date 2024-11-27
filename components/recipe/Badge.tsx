interface RecipeBadgeProps {
  value: string | number;
  label?: string;
  variant?: "default" | "outline" | "secondary";
}

export function RecipeBadge({ value, label, variant = "default" }: RecipeBadgeProps) {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium";
  const variantStyles = {
    default: "bg-blue-100 text-blue-800",
    outline: "border border-gray-200 text-gray-800",
    secondary: "bg-gray-100 text-gray-800"
  };

  return (
    <span class={`${baseStyles} ${variantStyles[variant]}`}>
      {label && <span class="mr-1 text-gray-500">{label}</span>}
      {value}
    </span>
  );
}