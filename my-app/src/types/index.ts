export interface User {
  id: number
  name: string
  email: string
}

export interface AuthResponse {
  user: User
  token: string
}

export interface LoginForm {
  email: string
  password: string
}