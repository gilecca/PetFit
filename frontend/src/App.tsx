import { Toaster } from 'react-hot-toast'; 
import { GlobalStyle } from "./styles/GlobalStyle";
import { RouteWeb } from "./routes";
import { AuthProvider } from './contexts/AuthContext';
import { RecipeProvider } from "./contexts/RecipeContext";

export function App() {
  return (
    <AuthProvider>
      <GlobalStyle />
      <RecipeProvider>
      <RouteWeb />
            <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      </RecipeProvider>
    </AuthProvider>
  );
}

export default App;

