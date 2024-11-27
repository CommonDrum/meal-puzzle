import { type Recipe } from "./schema.ts";

interface RecipeDisplayProps {
  recipe: Recipe;
}

export default function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  return (
    <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 class="text-3xl font-bold mb-2">{recipe.title}</h1>
      
      <div class="mb-4 text-gray-600">{recipe.description}</div>
      
      <div class="flex gap-4 mb-6 text-sm">
        <div class="flex items-center">
          <span class="font-semibold">Servings:</span>
          <span class="ml-2">{recipe.servings}</span>
        </div>
        <div class="flex items-center">
          <span class="font-semibold">Time:</span>
          <span class="ml-2">{recipe.totalMinutes} minutes</span>
        </div>
        <div class="flex items-center">
          <span class="font-semibold">Difficulty:</span>
          <span class="ml-2 capitalize">{recipe.difficulty}</span>
        </div>
      </div>
      
      <div class="mb-6">
        <h2 class="text-xl font-semibold mb-3">Ingredients</h2>
        <ul class="list-disc pl-5 space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.quantity} {ingredient.unit} {ingredient.name}
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h2 class="text-xl font-semibold mb-3">Instructions</h2>
        <ol class="list-decimal pl-5 space-y-3">
          {recipe.steps.map((step, index) => (
            <li key={index} class="pl-2">
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}