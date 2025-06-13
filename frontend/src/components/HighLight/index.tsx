import { Link } from "react-router-dom"; // 1. Importe o Link
import { SHighLight } from "./styles";

// 2. Altere as props: troque 'href' por 'id'
interface HighLightProps {
  id: string;
  title: string;
  src: string;
}

export function HighLight({ id, title, src }: HighLightProps) {
  return (
    <SHighLight>
      <section>
        {/* 3. Substitua <a> por <Link> e construa o caminho com o 'id' */}
        <Link to={`/recipe/${id}`}>
          <h3>{title}</h3>
          <img src={src} alt={`Imagem Receita ${title}`} />
        </Link>
      </section>
    </SHighLight>
  );
}