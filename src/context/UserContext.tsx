import { createContext, useEffect, useMemo, useState, useCallback } from 'react'
import { IUserProfile } from '@/types/user'
import { DEFAULT_USER } from '@/constants/user'
export interface IUserContext {
  user: IUserProfile
  updateUser: (user: IUserProfile) => void
}

export const UserContext = createContext<IUserContext>({} as IUserContext)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const storageKey = 'user-profile'

  const [user, setUser] = useState<IUserProfile>(() => {
    const savedUser = localStorage.getItem(storageKey)
    return savedUser ? JSON.parse(savedUser) : DEFAULT_USER
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(user))
  }, [user, storageKey])

  const updateUser = useCallback(
    (newUser: IUserProfile) => {
      setUser(newUser)
    },
    [setUser],
  )

  const contextValue = useMemo(
    () => ({
      user,
      updateUser,
    }),
    [user, updateUser],
  )

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}
