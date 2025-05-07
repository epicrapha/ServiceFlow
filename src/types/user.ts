export enum UserRole {
  ADMIN = "admin",
  LEADER = "leader",
  VOLUNTEER = "volunteer",
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  teams?: string[] // IDs of teams the user belongs to
  skills?: string[] // User's skills for scheduling
  phoneNumber?: string
  profileImage?: string
  createdAt: string
  updatedAt: string
}
