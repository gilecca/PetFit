import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'; // 1. Importando o toast para feedback

import { RecipeForm } from "../../components/RecipeForm";
// 2. Importando os tipos corretos da sua API
import { type ICreateRecipe, type IRecipe } from "../../services/api/recipes"; 
import { useRecipe } from "../../hooks/useRecipe";
import { BackButton, Container, NotFound, NotFoundMessage, NotFoundTitle, Title } from "./style";
import { Header } from "../../components/Header";

export const AdminEditRecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecipe, updateRecipe } = useRecipe();
  
  // A busca inicial da receita está correta
  const [recipe, setRecipe] = useState<IRecipe | undefined>(id ? getRecipe(id) : undefined);

  useEffect(() => {
    if (id) {
      setRecipe(getRecipe(id));
    }
  }, [id, getRecipe]);

  // 3. Corrigindo a função handleSubmit
  const handleSubmit = async (recipeData: ICreateRecipe) => { // <-- Tipo corrigido para ICreateRecipe
    if (!id) return;

    try {
      await updateRecipe(id, recipeData);
      toast.success("Receita atualizada com sucesso!"); // <-- Feedback de sucesso
      navigate(`/recipe/${id}`); // <-- Redirecionamento corrigido para a página da receita
    } catch (error) {
      console.error("Falha ao atualizar a receita:", error);
      toast.error("Falha ao atualizar a receita. Tente novamente."); // <-- Feedback de erro
    }
  };

  if (!recipe) {
    return (
      <NotFound>
        <NotFoundTitle>Receita não encontrada</NotFoundTitle>
        <NotFoundMessage>A receita que você está tentando editar não existe ou foi removida.</NotFoundMessage>
        {/* Navegação do botão de voltar também corrigida */}
        <BackButton onClick={() => navigate("/")}>Voltar para o Início</BackButton>
      </NotFound>
    );
  }

  return (
    <>
      <Header onSearchChange={() => {}} />
      <Container>
        <Title>Editar Receita</Title>
        <RecipeForm 
          initialData={recipe} 
          onSubmit={handleSubmit}
          buttonText="Salvar Alterações" 
        />
      </Container>
    </>
  );
};