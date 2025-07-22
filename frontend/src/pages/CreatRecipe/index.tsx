import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";
import { useRecipe } from "../../hooks/useRecipe";
import type { ICreateRecipe } from "../../services/api/recipes";
import { RecipeForm } from "../../components/RecipeForm";
import { Container, Title } from "./styles";
import { Header } from "../../components/Header";

export const AdminCreateRecipePage = () => {
  const { createRecipe } = useRecipe();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!currentUser) {
    return <h1>Você precisa estar logado para criar uma receita.</h1>;
  }
   
  const handleSubmit = async (recipeData: ICreateRecipe) => {
    try {
      await createRecipe(recipeData);
      alert("Receita criada com sucesso!");
      navigate(""); // Redireciona para a lista de receitas, por exemplo
    } catch (error) {
      console.error("Falha ao criar a receita:", error);
      alert("Erro ao criar a receita. Tente novamente.");
    }
  };

  return (
    <>
    <Header onSearchChange={() => {}} />
    <Container>
      <Title>Criar Nova Receita</Title>
      <RecipeForm onSubmit={handleSubmit} buttonText="Criar Receita" />
    </Container></>
  );
};
