import { api } from "../http/axios";

export interface ICreateRecipe {
    title: string;
    ingredients: string[];
    instructions: string[];
    is_public: boolean;
}

export interface IRecipe extends ICreateRecipe {
    id: string;
}

class RecipeService {
    getAllPublic() {
        return api.get<IRecipe[]>('/recipes/recipes');
    }

    getById(id: string) {
        return api.get<IRecipe>(`/recipes/recipes/${id}`);
    }

    create(data: ICreateRecipe) {
        return api.post<IRecipe>('/recipes/recipes', data);
    }

    update(id: string, data: Partial<ICreateRecipe>) {
        return api.put<IRecipe>(`/recipes/recipes/${id}`, data);
    }

    delete(id: string) {
        return api.delete(`/recipes/recipes/${id}`);
    }

    addFavorite(recipeId: string) {
        return api.post(`/recipes/recipes/${recipeId}/favorite`);
    }

    removeFavorite(recipeId: string) {
        return api.delete(`/recipes/recipes/${recipeId}/favorite`);
    }

    getMyFavorites() {
        return api.get<IRecipe[]>('/recipes/users/me/favorites/recipes');
    }
}

export default new RecipeService();
