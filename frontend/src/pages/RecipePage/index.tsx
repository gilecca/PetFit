import React, { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import * as S from './styles';
import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/userAuth';
import { RecipeContext } from '../../contexts/RecipeContext';
import RecipeService from '../../services/api/recipes';
import { Button } from '../../components/Button';

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

  // Função de sanitização robusta
const sanitizeField = (field: any): string[] => {
  if (!field) {
    return [];
  }


  const rawString = Array.isArray(field) ? field.join('') : String(field);

  const cleanedString = rawString.replace(/[,{}"']/g, '').trim();

  const ingredients = cleanedString
    .split(/(?=\d|[A-ZÇ])/)
    .map(item => item.trim())
    .filter(Boolean);

  return ingredients.length > 0 ? ingredients : [cleanedString];
};


  const ingredients = sanitizeField(recipe.ingredients);
  const instructions = sanitizeField(recipe.instructions);

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
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill={isSaved ? "orange" : "black"}>
                  <path d="M6 2a1 1 0 0 0-1 1v19.586l7-7 7 7V3a1 1 0 0 0-1-1H6z" />
                </svg>
                <span>{isSaved ? "Remover" : "Salvar"}</span>
              </S.SaveRecipeButton>
            </div>
          </div>

          <div>
            <h2>{recipe.title}</h2>
            <S.RecipeImage
              src={"/assets/Gemini_Generated_Image_yxuo70yxuo70yxuo.png"}
              alt={`Imagem de ${recipe.title}`}
            />
          </div>

          <S.RecipeDetails>
            <h3>Ingredientes</h3>
            {ingredients.length > 0 ? (
              <ul>
                {ingredients.map((ingredient: string, index: number) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            ) : (
              <p>Não há ingredientes cadastrados.</p>
            )}

            <h3>Modo de Preparo</h3>
            {instructions.length > 0 ? (
              <ol>
                {instructions.map((instruction: string, index: number) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            ) : (
              <p>Não há instruções cadastradas.</p>
            )}
          </S.RecipeDetails>
        </section>
      </S.MainContent>
    </>
  );
};

export default RecipePage;
