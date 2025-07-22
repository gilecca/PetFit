import { useContext } from "react";
import { HighLight } from "../HighLight";
import { HighlightVideo } from "../HighlightVideo";
import { EmphasisWrapper, SEmphasis } from "./styled";
import { RecipeContext } from "../../contexts/RecipeContext";


interface EmphasisProps {
  searchTerm: string;
}

export function Emphasis({ searchTerm }: EmphasisProps) {
  // Acessa as receitas e o estado de carregamento do contexto
  const { recipes, isLoading } = useContext(RecipeContext);

  // Filtra as receitas do contexto com base no termo de busca
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Mostra uma mensagem de "carregando" enquanto os dados não chegam
  if (isLoading) {
    return <p>Carregando destaques...</p>;
  }

  return (
    <EmphasisWrapper>
      <HighlightVideo />

      <SEmphasis>
        <h1>Destaques 🐾</h1>
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <HighLight
              key={recipe.id}
              href={`/recipe/${recipe.id}`}
              title={recipe.title}
            />
          ))
        ) : (
          <p>Nenhuma receita encontrada para "{searchTerm}".</p>
        )}
      </SEmphasis>
    </EmphasisWrapper>
  );
}
