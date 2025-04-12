import React from 'react'
import { ThemeToggle } from './ThemeToogle'
import { useUser } from '@/hooks/useUser'
interface HeaderProps {
  children?: React.ReactNode
}

export function Header({ children }: HeaderProps) {
  const { user } = useUser()

  return (
    <header className="bg-background fixed top-0 z-50 w-full border-b">
      <div className="flex h-14 items-center px-4">
        <div className="mr-4 flex">
          <span className="font-bold">Chat App - {user.name}</span>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center gap-2">
            {children}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
