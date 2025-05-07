"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import type { User, UserRole } from "../types/user"
import * as authService from "../services/authService"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: Omit<User, "id">) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
  hasRole: (role: UserRole) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const loadUser = async () => {
      try {
        const userJson = await AsyncStorage.getItem("user")
        if (userJson) {
          setUser(JSON.parse(userJson))
        }
      } catch (error) {
        console.error("Failed to load user from storage", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      const loggedInUser = await authService.login(email, password)
      setUser(loggedInUser)
      await AsyncStorage.setItem("user", JSON.stringify(loggedInUser))
    } catch (error) {
      console.error("Login failed", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: Omit<User, "id">) => {
    setIsLoading(true)
    try {
      const newUser = await authService.register(userData)
      setUser(newUser)
      await AsyncStorage.setItem("user", JSON.stringify(newUser))
    } catch (error) {
      console.error("Registration failed", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    setIsLoading(true)
    try {
      await authService.logout()
      setUser(null)
      await AsyncStorage.removeItem("user")
    } catch (error) {
      console.error("Logout failed", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const hasRole = (role: UserRole) => {
    return user?.role === role
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
