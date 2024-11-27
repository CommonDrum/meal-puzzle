interface Ingredient {
  quantity: number;
  unit: string;
  name: string;
}

interface IngredientListProps {
  ingredients: Ingredient[];
}

export function IngredientList({ ingredients }: IngredientListProps) {
  return (
    <div class="space-y-2">
      {ingredients.map((ingredient, index) => (
        <div key={index} class="flex items-center p-2 bg-gray-50 rounded-lg">
          <div class="w-20 text-right pr-3 text-sm font-medium text-gray-600">
            {ingredient.quantity} {ingredient.unit}
          </div>
          <div class="flex-1 pl-3 border-l border-gray-200">
            {ingredient.name}
          </div>
        </div>
      ))}
    </div>
  );
}