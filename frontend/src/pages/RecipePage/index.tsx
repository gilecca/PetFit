import React, { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as S from './styles';
import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/userAuth';
import { RecipeContext } from '../../contexts/RecipeContext';
import RecipeService from '../../services/api/recipes';
import { Button } from '../../components/Button'; 

// Função corrigida para parsear array do banco corretamente
const parseDatabaseArray = (field: unknown): string[] => {
  if (Array.isArray(field)) {
    return field;
  }

  if (typeof field === "string") {
    const cleaned = field
      .replace(/^{|}$/g, '')  // Remove { e }
      .replace(/^"|"$/g, '')  // Remove aspas externas

    // Verifica se tem vírgulas (array real), ou espaços (caso atual)
    const separator = cleaned.includes(',') ? ',' : ' ';

    return cleaned
      .split(separator)
      .map(item => item.trim())
      .filter(item => item.length > 0);
  }

  return [];
};


const RecipePage: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const navigate = useNavigate();

  const { getRecipe, isLoading } = useContext(RecipeContext);
  const { currentUser } = useAuth();

  const [isSaved, setIsSaved] = useState(false);

  if (!recipeId) {
    return <div>ID da receita não fornecido.</div>;
  }

  const recipe = getRecipe(recipeId);

  const toggleSave = async () => {
    if (!currentUser) {
      toast.error("Você precisa fazer login para favoritar receitas.");
      return;
    }
    try {
      if (isSaved) {
        await RecipeService.removeFavorite(recipeId);
        toast.success("Receita removida dos favoritos!");
      } else {
        await RecipeService.addFavorite(recipeId);
        toast.success("Receita adicionada aos favoritos!");
      }
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Erro ao favoritar a receita:", error);
      toast.error("Ocorreu um erro. Tente novamente.");
    }
  };

  if (isLoading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Carregando receita...</h1>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Receita não encontrada!</h1>
        <p>A receita com o ID "{recipeId}" não existe ou não está disponível.</p>
        <Link to="/">Voltar para a página inicial</Link>
      </div>
    );
  }

  // Trata os campos de ingredientes e instruções
  const ingredients = parseDatabaseArray(recipe.ingredients);
  const instructions = parseDatabaseArray(recipe.instructions);

  return (
    <>
      <Header onSearchChange={() => {}} />
      <S.MainContent>
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <button onClick={() => navigate(-1)}>← Voltar</button>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to={`/recipes/edit/${recipeId}`}>
                <Button>Editar Receita</Button>
              </Link>

              <S.SaveRecipeButton onClick={toggleSave}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24" width="24" height="24" fill={isSaved ? "orange" : "black"}>
                  <path d="M6 2a1 1 0 0 0-1 1v19.586l7-7 7 7V3a1 1 0 0 0-1-1H6z" />
                </svg>
                <span>{isSaved ? "Remover" : "Salvar"}</span>
              </S.SaveRecipeButton>
            </div>
          </div>
          
          <div>
            <h2>{recipe.title}</h2>
            <S.RecipeImage
              src={'/src/assets/Gemini_Generated_Image_yxuo70yxuo70yxuo.png'}
              alt={`Imagem de ${recipe.title}`}
            />
          </div>

          <S.RecipeDetails>
            <h3>Ingredientes</h3>
            <ul>
              {recipe.ingredients}
            </ul>

            <h3>Modo de preparo</h3>
            <ol>
            {recipe.instructions}
            </ol>
          </S.RecipeDetails>
        </section>
      </S.MainContent>
    </>
  );
};

export default RecipePage;
