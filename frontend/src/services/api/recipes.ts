import { api } from "../http/axios";

// As interfaces continuam as mesmas
export interface ICreateRecipe {
    title: string;
    ingredients: string[]; 
    instructions: string[];
    is_public: boolean;
    imageUrl: string;
}

export interface IRecipe extends ICreateRecipe {
    id: string;
}

class RecipeService {
    // --- MÉTODOS DE RECEITAS (CORRIGIDOS) ---
    getAllPublic() {
        // CORREÇÃO: O endpoint para listar receitas públicas
        return api.get<IRecipe[]>('/recipes/recipes');
    }

    getById(id: string) {
        // CORREÇÃO: O endpoint para buscar por ID
        return api.get<IRecipe>(`/recipes/recipes/${id}`);
    }

    create(data: ICreateRecipe) {
        // CORREÇÃO: O endpoint para criar uma receita
        return api.post<IRecipe>('/recipes/recipes', data);
    }

    update(id: string, data: ICreateRecipe) {
        // CORREÇÃO: O endpoint para atualizar uma receita
        return api.put<IRecipe>(`/recipes/recipes/${id}`, data);
    }

    delete(id: string) {
        // CORREÇÃO: O endpoint para deletar uma receita
        return api.delete(`/recipes/recipes/${id}`);
    }

    // --- MÉTODOS DE FAVORITOS (CORRIGIDOS) ---
    addFavorite(recipeId: string) {
        // CORREÇÃO: O endpoint para adicionar um favorito
        return api.post(`/recipes/recipes/${recipeId}/favorite`);
    }

    removeFavorite(recipeId: string) {
        // CORREÇÃO: O endpoint para remover um favorito
        return api.delete(`/recipes/recipes/${recipeId}/favorite`);
    }

    getMyFavorites() {
        // CORREÇÃO: O endpoint para listar os favoritos do usuário
        return api.get<IRecipe[]>('/recipes/users/me/favorites/recipes');
    }
}

export default new RecipeService();