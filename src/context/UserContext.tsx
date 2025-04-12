import { createContext, useEffect, useMemo, useState, useCallback } from 'react'
import { UserProfile } from '@/types/user'

const DEFAULT_USER: UserProfile = {
  id: 1,
  name: 'Fulano',
}

export interface IUserContext {
  user: UserProfile
  updateUser: (user: UserProfile) => void
}

export const UserContext = createContext<IUserContext>({} as IUserContext)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const storageKey = 'user-profile'

  const [user, setUser] = useState<UserProfile>(() => {
    const savedUser = localStorage.getItem(storageKey)
    return savedUser ? JSON.parse(savedUser) : DEFAULT_USER
  })

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(user))
  }, [user, storageKey])

  const updateUser = useCallback(
    (newUser: UserProfile) => {
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
