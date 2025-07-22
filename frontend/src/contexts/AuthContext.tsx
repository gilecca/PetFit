"use client"

import { createContext, useState, useEffect, type ReactNode, useContext } from "react"
import type { UserProps } from "../types/UserType"
import apiUser from "../services/api/users" // Verifique o caminho do import
import axios from 'axios'

// --- Interface do Contexto ---
export interface AuthContextType {
  currentUser: UserProps | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateUserName: (newName: string) => Promise<void>
}

// --- Criação do Contexto ---
export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateUserName: async () => {},
})

interface AuthProviderProps {
  children: ReactNode
}

// --- Provedor do Contexto ---
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Carrega o usuário do localStorage na inicialização
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser")
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // --- Função de Login ---
  const login = async (email: string, password: string) => {
    try {
      const response = await apiUser.login({ email, password })
      const { user, access_token } = response.data

      setCurrentUser(user)
      localStorage.setItem("currentUser", JSON.stringify(user))
      localStorage.setItem("token", access_token)
    } catch (error) {
      console.error("Erro de login:", error)
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw new Error("E-mail ou senha inválidos.")
      }
      throw new Error("Não foi possível fazer login. Tente novamente.")
    }
  }

  // --- Função de Registro ---
  const register = async (name: string, email: string, password: string) => {
    try {
      // 1. Registra o novo usuário na API
      await apiUser.register({ name, email, password })
      // 2. Após o sucesso, faz o login automaticamente
      await login(email, password)
    } catch (error) {
      console.error("Erro de registro:", error)
      if (axios.isAxiosError(error) && error.response) {
        // Usa a mensagem de erro da API (ex: "E-mail já cadastrado")
        throw new Error(error.response.data.message || 'Não foi possível realizar o cadastro.')
      }
      throw new Error("Ocorreu um erro de comunicação. Tente novamente.")
    }
  }

  // --- Função para Atualizar Nome de Usuário ---
  const updateUserName = async (newName: string) => {
    if (!currentUser) throw new Error("Usuário não autenticado.")

    try {
      const updatedUser = await apiUser.updateProfile({ name: newName })
      
      setCurrentUser(updatedUser.data)
      localStorage.setItem("currentUser", JSON.stringify(updatedUser.data))
    } catch (error) {
      console.error("Erro ao atualizar o nome:", error)
      throw new Error("Não foi possível atualizar o nome.")
    }
  }

  // --- Função de Logout ---
  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
    localStorage.removeItem("token")
  }

  // --- Provedor ---
  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        login,
        register,
        logout,
        updateUserName,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// --- Hook customizado ---
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}