// schemas/recipe.ts
import { z } from "zod";

// Define the schema
const IngredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  unit: z.string().optional().default(""), // Made unit optional
  quantity: z.number().positive("Quantity must be a positive number")
});

const RecipeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  servings: z.number().int().positive("Servings must be a positive number"),
  totalMinutes: z.number().int().positive("Total minutes must be a positive number"),
  ingredients: z.array(IngredientSchema).min(1, "At least one ingredient is required"),
  steps: z.array(z.string().min(1, "Step cannot be empty")).min(1, "At least one step is required"),
  difficulty: z.enum(["easy", "medium", "hard"], {
    errorMap: () => ({ message: "Difficulty must be easy, medium, or hard" })
  })
});

// Create types from the schema
type Recipe = z.infer<typeof RecipeSchema>;
type Ingredient = z.infer<typeof IngredientSchema>;

// Optional: Helper function to parse recipe data
function parseRecipe(data: unknown): Recipe {
  return RecipeSchema.parse(data);
}

// Optional: Helper function to safely parse recipe data
function safeParseRecipe(data: unknown) {
  return RecipeSchema.safeParse(data);
}

export {
  RecipeSchema,
  IngredientSchema,
  type Recipe,
  type Ingredient,
  parseRecipe,
  safeParseRecipe
};