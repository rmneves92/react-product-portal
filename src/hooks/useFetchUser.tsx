import { useState } from 'react'
import { api } from '@/utils/fetch/api'
import { IUser } from '@/@types/user'

export const useFetchUser = () => {
  const [user, setUser] = useState<IUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const fetchUser = async (email: string, senha: string) => {
    try {
      setIsLoading(true)
      setIsError(false)

      const response = await api.get<IUser[]>('/v1/user')
      const authenticatedUser = response.data.find(
        (u) => u.email === email && u.senha === senha
      )

      if (authenticatedUser) {
        setUser(authenticatedUser)
      } else {
        setIsError(true)
      }
    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  const registerUser = async (userData) => {
    try {
      setIsLoading(true)
      setIsError(false)

      const response = await api.post<IUser>('/v1/user', userData)
      const registeredUser = response.data

      setUser(registeredUser)
    } catch (error) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  return { user, isLoading, isError, fetchUser, registerUser }
}
