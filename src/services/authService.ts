import { type User, UserRole } from "../types/user"

// This is a mock implementation. In a real app, you would connect to your backend API.
// For now, we'll simulate API calls with local storage and timeouts

export const login = async (email: string, password: string): Promise<User> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, you would validate credentials against your backend
  if (email === "admin@example.com" && password === "password") {
    return {
      id: "1",
      email: "admin@example.com",
      firstName: "Admin",
      lastName: "User",
      role: UserRole.ADMIN,
      teams: [],
      skills: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  } else if (email === "leader@example.com" && password === "password") {
    return {
      id: "2",
      email: "leader@example.com",
      firstName: "Team",
      lastName: "Leader",
      role: UserRole.LEADER,
      teams: ["worship", "tech"],
      skills: ["vocals", "guitar"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  } else if (email === "volunteer@example.com" && password === "password") {
    return {
      id: "3",
      email: "volunteer@example.com",
      firstName: "Regular",
      lastName: "Volunteer",
      role: UserRole.VOLUNTEER,
      teams: ["worship"],
      skills: ["vocals"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  throw new Error("Invalid credentials")
}

export const register = async (userData: Omit<User, "id">): Promise<User> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, you would send this data to your backend
  return {
    id: Math.random().toString(36).substring(2, 9), // Generate a random ID
    ...userData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

export const logout = async (): Promise<void> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, you would invalidate the session on your backend
  return
}

export const getCurrentUser = async (): Promise<User | null> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In a real app, you would validate the token with your backend
  return null
}
