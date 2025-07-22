import { useState, useEffect } from "react";
import { Header } from "../../components/Header";
import { HighLight } from "../../components/HighLight";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/userAuth";
import toast from 'react-hot-toast';
import { type IRecipe } from "../../services/api/recipes";
// 1. Importando o serviço e os tipos reais
import RecipeService from "../../services/api/recipes";


export function SavedRecipes() {
  const { currentUser, setUserName } = useAuth();

  // 2. Estados para as receitas reais e para o carregamento
  const [savedRecipes, setSavedRecipes] = useState<IRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(currentUser?.name || "");

  // 3. Efeito para buscar as receitas salvas da API quando a página carrega
  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await RecipeService.getMyFavorites();
        setSavedRecipes(response.data);
      } catch (error) {
        console.error("Erro ao buscar receitas salvas:", error);
        toast.error("Não foi possível carregar suas receitas salvas.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedRecipes();
  }, []); // O array vazio [] faz com que isso rode apenas uma vez

  // 4. Lógica de "remover" adaptada para a API
  const handleUnsaveRecipe = async (id: string) => {
    try {
      // Chama a API para remover o favorito no backend
      await RecipeService.removeFavorite(id);
      
      // Atualiza a lista no frontend para a UI refletir a mudança instantaneamente
      setSavedRecipes((prev) => prev.filter((recipe) => recipe.id !== id));
      
      toast.success("Receita removida com sucesso!");
    } catch (error) {
      console.error("Erro ao remover receita:", error);
      toast.error("Falha ao remover a receita. Tente novamente.");
    }
  };

  const handleSaveName = () => {
    if (newName.trim()) {
      setUserName(newName.trim());
      setEditingName(false);
    }
  };

  return (
    <>
      <Header onSearchChange={() => {}} />

      <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "1rem" }}>Receitas Salvas 🐾</h1>

        {/* Seção para editar nome (mantida como estava) */}
        <div style={{ marginBottom: "2rem" }}>
          {editingName ? (
            <>
              <input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                style={{ /* ... estilos ... */ }}
              />
              <Button onClick={handleSaveName}>Salvar</Button>
            </>
          ) : (
            <>
              
            </>
          )}
        </div>

        {/* 5. Verificação de carregamento e lista de receitas */}
        {isLoading ? (
          <p>Carregando suas receitas...</p>
        ) : savedRecipes.length === 0 ? (
          <p className="empty-message">Você ainda não salvou nenhuma receita.</p>
        ) : (
          <div className="recipe-list">
            {savedRecipes.map((recipe) => (
              <div key={recipe.id} className="recipe-card" style={{ marginBottom: "2rem" }}>
                <HighLight
                  href={`/recipe/${recipe.id}`}
                  title={recipe.title}
                  // A prop 'src' foi removida, pois o HighLight já usa a imagem padrão
                />
                <Button
                  onClick={() => handleUnsaveRecipe(recipe.id)}
                  className="unsave-button"
                >
                  Remover
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}