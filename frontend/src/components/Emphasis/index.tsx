import { HighLight } from "../HighLight";
import { HighlightVideo } from "../HighlightVideo";
import { EmphasisWrapper, SEmphasis } from "./styled";
import { recipes } from "../../mocks/recipes";

interface EmphasisProps {
  searchTerm: string;
}

export function Emphasis({ searchTerm }: EmphasisProps) {
  const filteredRecipes = recipes.filter((recipe) => {
    const lowerSearch = searchTerm.toLowerCase();
    return recipe.title.toLowerCase().includes(lowerSearch);
  });

  return (
    <EmphasisWrapper>
      <HighlightVideo />

      <SEmphasis>
        <h1>Destaques 🐾</h1>
        
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(({ id, title, imageUrl }) => (
            <HighLight
              key={id}
              id={id}
              title={title}
              src={imageUrl}
            />
          ))
        ) : (
          <p>Nenhuma receita encontrada com o termo "{searchTerm}".</p>
        )}
      </SEmphasis>
    </EmphasisWrapper>
  );
}