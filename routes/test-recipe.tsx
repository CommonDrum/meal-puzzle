// routes/test-recipe.tsx
import { type PageProps } from "$fresh/server.ts";
import RecipeDisplay from "../islands/recipe/RecipeIsland.tsx";
import { RecipeSchema, type Recipe } from "../islands/recipe/schema.ts";

// Sample recipe data
const sampleRecipe = {
  title: "Classic Chocolate Chip Cookies",
  description: "Soft and chewy chocolate chip cookies that are perfect for any occasion.",
  servings: 24,
  totalMinutes: 45,
  ingredients: [
    { name: "all-purpose flour", unit: "cups", quantity: 2.25 },
    { name: "baking soda", unit: "tsp", quantity: 1 },
    { name: "salt", unit: "tsp", quantity: 1 },
    { name: "unsalted butter", unit: "cups", quantity: 1 },
    { name: "granulated sugar", unit: "cup", quantity: 0.75 },
    { name: "brown sugar", unit: "cup", quantity: 0.75 },
    { name: "vanilla extract", unit: "tsp", quantity: 1 },
    { name: "large eggs", unit: "", quantity: 2 },
    { name: "chocolate chips", unit: "cups", quantity: 2 }
  ],
  steps: [
    "Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.",
    "In a bowl, whisk together flour, baking soda, and salt.",
    "In a large bowl, cream together butter, granulated sugar, brown sugar, and vanilla until smooth.",
    "Beat in eggs one at a time until well combined.",
    "Gradually stir dry ingredients into butter mixture.",
    "Fold in chocolate chips.",
    "Drop rounded tablespoons of dough onto prepared baking sheets.",
    "Bake for 10-12 minutes or until edges are lightly browned.",
    "Cool on baking sheets for 5 minutes before transferring to wire racks."
  ],
  difficulty: "easy"
};

export default function TestRecipe(props: PageProps) {
  // Parse and validate the recipe data
  let recipe: Recipe;
  try {
    recipe = RecipeSchema.parse(sampleRecipe);
  } catch (error) {
    return (
      <div class="p-4">
        <h1 class="text-2xl text-red-600">Error Parsing Recipe</h1>
        <pre class="mt-4 p-4 bg-red-50 rounded">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div class="min-h-screen bg-gray-100 py-8">
      <RecipeDisplay recipe={recipe} />
    </div>
  );
}