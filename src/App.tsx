import { Chat } from './components/Chat'
import { ThemeProvider } from '@/components/theme/theme-provider'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="chat-ui-theme">
      <Chat />
    </ThemeProvider>
  )
}

export default App
