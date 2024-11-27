import { type Recipe } from "./schema.ts";
import { RecipeBadge } from "../../components/recipe/Badge.tsx";
import { RecipeMetric } from "../../components/recipe/RecipeMetric.tsx";
import { IngredientList } from "../../components/recipe/IngredientList.tsx";
import { StepList } from "../../components/recipe/StepList.tsx";
import { SectionHeader } from "../../components/ui/SectionHeader.tsx";

interface RecipeDisplayProps {
  recipe: Recipe;
}

export default function RecipeDisplay({ recipe }: RecipeDisplayProps) {
  return (
    <div class="max-w-2xl mx-auto p-8">
      {/* Header Section */}
      <div class="space-y-6 mb-8">
        <h1 class="text-4xl font-bold text-gray-900">{recipe.title}</h1>
        <p class="text-lg text-gray-600">{recipe.description}</p>
        {/* Recipe Metrics */}
        <div class="flex flex-wrap gap-6">
          <RecipeMetric
            icon="👥"
            label="Servings"
            value={recipe.servings}
          />
          <RecipeMetric
            icon="⏱️"
            label="Total Time"
            value={`${recipe.totalMinutes} min`}
          />
          <RecipeMetric
            icon="📊"
            label="Difficulty"
            value={recipe.difficulty}
          />
        </div>
        {/* Quick Info Badges */}
        <div class="flex flex-wrap gap-2">
          <RecipeBadge
            value={`${recipe.servings} servings`}
            variant="outline"
          />
          <RecipeBadge
            value={`${recipe.totalMinutes} minutes`}
            variant="secondary"
          />
          <RecipeBadge
            value={recipe.difficulty}
            variant="default"
          />
        </div>
      </div>
      {/* Ingredients Section */}
      <div class="mb-8">
        <SectionHeader
          title="Ingredients"
          subtitle={`Everything you need to serve ${recipe.servings} people`}
        />
        <IngredientList ingredients={recipe.ingredients} />
      </div>
      {/* Instructions Section */}
      <div>
        <SectionHeader
          title="Instructions"
          subtitle="Follow these steps to prepare your dish"
        />
        <StepList steps={recipe.steps} />
      </div>
    </div>
  );
}