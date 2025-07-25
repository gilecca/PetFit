import { SHeader } from "./styles";
import { FcSearch } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/userAuth";
import { Button } from "../Button";


interface HeaderProps {
  onSearchChange?: (value: string) => void; 
}

export function Header({ onSearchChange }: HeaderProps) {
  const { currentUser, logout } = useAuth();

  return (
    <SHeader>
      <div><Link to="/">
        <img src="/assets/logoRacao.png" alt="Pet Fit Logo" />
        </Link>
        <h1>Pet Fit</h1>
      </div>

      <input type="checkbox" id="menu" />
      <nav>
        <label htmlFor="menu">
          <span></span>
          <span></span>
          <span></span>
        </label>

        <div>
          <form onSubmit={(e) => e.preventDefault()}>
            <FcSearch />
            <input
              type="text"
              name="search"
              placeholder="Busca"
              onChange={(e) => onSearchChange?.(e.target.value)} 
            />
          </form>

          {currentUser ? (
            <>
              <Link to="/receitas-salvas">Receitas Salvas</Link>
              <Link to="/recipes/create">Criar Receita</Link>
              
              <Button type="button" onClick={logout}>
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </nav>
    </SHeader>
  );
}
