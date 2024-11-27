interface RecipeMetricProps {
  icon: string;  // Using emoji or icon class name
  label: string;
  value: string | number;
}

export function RecipeMetric({ icon, label, value }: RecipeMetricProps) {
  return (
    <div class="flex items-center gap-2">
      <span class="text-lg">{icon}</span>
      <div class="flex flex-col">
        <span class="text-xs text-gray-500">{label}</span>
        <span class="font-medium">{value}</span>
      </div>
    </div>
  );
}