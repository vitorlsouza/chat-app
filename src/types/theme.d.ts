export type Theme = 'light' | 'dark' | 'system'

export interface IThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

export interface IThemeProviderState {
  theme: Theme
  setTheme: (theme: Theme) => void
}
