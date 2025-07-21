// src/services/apiUser.ts

import { api } from '../http/axios'; // Importa a instância configurada do Axios
import type { UserProps } from '../../types/UserType'; // Supondo que você tenha este tipo

// Interfaces para os dados que enviamos para a API
// É uma boa prática ter interfaces específicas para cada operação
export interface IUpdateProfileData {
    name: string;
}
export interface IRegisterData {
  name: string;
  email: string;
  password: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

// Interface para a resposta esperada da API de login
export interface ILoginResponse {
  user: UserProps;
  access_token: string;
}

class UserData {
  /**
   * Envia os dados de registro para o endpoint /users/register/
   * @param data - Objeto com nome, email e senha.
   */
  register(data: IRegisterData) {
    // Adiciona o 'role' aqui antes de enviar, se o backend não fizer isso automaticamente.
    return api.post('/users/register/', { ...data, role: 'user' });
  }

  /**
   * Envia os dados de login para o endpoint /users/login/
   * @param data - Objeto com email e senha.
   * O <ILoginResponse> informa ao TypeScript qual o formato esperado da resposta.
   */
  login(data: ILoginData) {
    return api.post<ILoginResponse>('/users/login/', data);
  }

  /**
   * Busca os dados do usuário logado no endpoint /users/me/
   * Esta rota deve ser protegida no backend e precisará do token de autorização.
   * O interceptor que criamos no arquivo api.ts cuidará de adicionar o token automaticamente.
   */
  me() {
    return api.get<UserProps>('/users/me/');
  }
  updateProfile(data: IUpdateProfileData) {
        return api.patch<UserProps>('/users/me', data);
    }
}



// Exporta uma única instância da classe (padrão Singleton)
const apiUser = new UserData();
export default apiUser;