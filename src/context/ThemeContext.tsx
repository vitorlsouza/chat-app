import { STORAGE_KEY, DEFAULT_THEME } from '@/constants/theme'
import { Theme, ThemeProviderProps } from '@/types/theme'
import { createContext, useEffect, useMemo, useState, useCallback } from 'react'
export interface IThemeContext {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext)

export const ThemeProvider = ({
  children,
  defaultTheme = DEFAULT_THEME,
  storageKey = STORAGE_KEY,
}: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  const handleSetTheme = useCallback((theme: Theme) => {
    localStorage.setItem(storageKey, theme)
    setTheme(theme)
  }, [])

  const contextValue = useMemo(() => {
    return {
      theme,
      setTheme: handleSetTheme,
    }
  }, [theme, handleSetTheme])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
