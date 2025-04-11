import { Message } from '@/types/chat'
import { useEffect, useState } from 'react'

export const useLocalStorage = (key: string) => {
  const getMessages = () => {
    try {
      const item = window.localStorage.getItem(key)
      if (!item) return []

      const parsedItem = JSON.parse(item)

      return parsedItem
    } catch (error) {
      console.error('Erro ao ler do localStorage:', error)
      return []
    }
  }

  const [messages, setMessages] = useState<Message[]>(getMessages())

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(messages))
  }, [messages, key])

  return {
    messages,
    setMessages,
  }
}
