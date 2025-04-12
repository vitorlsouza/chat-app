import { Chat } from './components/Chat'
import { ThemeProvider } from '@/context/ThemeContext'
import { UserProvider } from '@/context/UserContext'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="chat-ui-theme">
      <UserProvider>
        <Chat />
      </UserProvider>
    </ThemeProvider>
  )
}

export default App
