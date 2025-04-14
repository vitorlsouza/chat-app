import { Chat } from './components/chat/Chat'
import { ThemeProvider } from '@/context/ThemeContext'
import { UserProvider } from '@/context/UserContext'
import { STORAGE_KEY, DEFAULT_THEME } from '@/constants/theme'

function App() {
  return (
    <ThemeProvider defaultTheme={DEFAULT_THEME} storageKey={STORAGE_KEY}>
      <UserProvider>
        <Chat />
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
