import { createContext, useState, useEffect, type ReactNode } from "react";
import type { IRecipe, ICreateRecipe } from "../services/api/recipes";
import RecipeService from "../services/api/recipes"

interface RecipeContextType {
  recipes: IRecipe[];
  isLoading: boolean;
  getRecipe: (id: string) => IRecipe | undefined;
  createRecipe: (data: ICreateRecipe) => Promise<IRecipe>;
  updateRecipe: (id: string, data: Partial<ICreateRecipe>) => Promise<IRecipe>;
  deleteRecipe: (id: string) => Promise<void>;
}

export const RecipeContext = createContext<RecipeContextType>({
  recipes: [],
  isLoading: true,
  getRecipe: () => undefined,
  createRecipe: async () => ({
    id: "",
    title: "",
    ingredients: [],
    instructions: [],
    is_public: false,
  }),
  updateRecipe: async () => ({
    id: "",
    title: "",
    ingredients: [],
    instructions: [],
    is_public: false,
  }),
  deleteRecipe: async () => {},
});

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider = ({ children }: RecipeProviderProps) => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      const response = await RecipeService.getAllPublic();
      setRecipes(response.data);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const getRecipe = (id: string) => {
    return recipes.find((recipe) => recipe.id === id);
  };

  const createRecipe = async (data: ICreateRecipe) => {
    const response = await RecipeService.create(data);
    setRecipes((prev) => [...prev, response.data]);
    return response.data;
  };

  const updateRecipe = async (id: string, data: Partial<ICreateRecipe>) => {
    const response = await RecipeService.update(id, data);
    setRecipes((prev) =>
      prev.map((recipe) => (recipe.id === id ? response.data : recipe))
    );
    return response.data;
  };


  const deleteRecipe = async (id: string) => {
    await RecipeService.delete(id);
    setRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        isLoading,
        getRecipe,
        createRecipe,
        updateRecipe,
        deleteRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
