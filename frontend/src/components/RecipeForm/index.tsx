import React, { useState } from "react";
import type { ICreateRecipe } from "../../services/api/recipes";
import { FormContainer, FormGroup, Label, Input, TextArea, CheckboxWrapper, Button } from "./styles"; // Importando estilos

// O formulário pode receber dados iniciais (para edição) e um texto para o botão
interface RecipeFormProps {
  onSubmit: (data: ICreateRecipe) => void;
  initialData?: Partial<ICreateRecipe>;
  buttonText?: string;
}

export const RecipeForm = ({ 
  onSubmit, 
  initialData, 
  buttonText = "Salvar" 
}: RecipeFormProps) => {
  // Estados para cada campo do formulário
  const [title, setTitle] = useState(initialData?.title || "");
  // Para ingredientes e instruções, usamos uma textarea e juntamos/separamos por linha
  const [ingredients, setIngredients] = useState(initialData?.ingredients?.join('\n') || "");
  const [instructions, setInstructions] = useState(initialData?.instructions?.join('\n') || "");
  const [isPublic, setIsPublic] = useState(initialData?.is_public || false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Transforma os textos de volta em arrays, removendo linhas vazias
    const ingredientsArray = [ingredients.replace(/\n/g, ' ').trim()];

    const instructionsArray = [instructions.replace(/\n/g, ' ').trim()];


    // Chama a função de submit passada pelo componente pai com os dados formatados
    onSubmit({
      title,
      ingredients: ingredientsArray,
      instructions: instructionsArray,
      is_public: isPublic,
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="ingredients">Ingredientes (um por linha)</Label>
        <TextArea
          id="ingredients"
          rows={8}
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
        />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="instructions">Instruções (um passo por linha)</Label>
        <TextArea
          id="instructions"
          rows={12}
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
        />
      </FormGroup>
      
      <CheckboxWrapper>
        <input
          id="is_public"
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        <Label htmlFor="is_public" style={{ marginBottom: 0 }}>Tornar esta receita pública?</Label>
      </CheckboxWrapper>

      <Button type="submit">{buttonText}</Button>
    </FormContainer>
  );
};