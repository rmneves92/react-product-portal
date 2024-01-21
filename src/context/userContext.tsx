import React, { createContext, FC, useContext, useState } from 'react'
import { UserContextType, IUser } from '@/@types/user'

export const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [user, setUser] = useState<IUser | null>(null)

  const updateUser = (newUser: IUser | null) => {
    setUser(newUser)
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }

  return context
}
