import React from 'react'
import { ThemeToggle } from './theme/theme-toogle'

export const Header: React.FC = () => {
  return (
    <header className="bg-background sticky top-0 z-10 flex justify-end border-b p-4">
      <ThemeToggle />
    </header>
  )
}
