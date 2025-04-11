import React from 'react'
import { ThemeToggle } from './theme/theme-toogle'

export const Header: React.FC = () => {
  return (
    <header className="bg-background fixed top-0 right-0 left-0 z-50 flex justify-end border-b p-4">
      <ThemeToggle />
    </header>
  )
}
