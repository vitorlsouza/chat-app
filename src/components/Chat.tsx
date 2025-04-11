import React, { useState } from 'react'
import { Button } from '../components/ui/button'
import { useAutoScroll } from '../lib/useAutoScroll'
import { Header } from './Header'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const { bottomRef } = useAutoScroll(messages)

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setInputMessage('')

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Esse é um teste de resposta do bot.',
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  return (
    <div className="flex h-screen w-full flex-col">
      <Header />
      <div className="bg-background text-foreground mt-4 flex flex-1 flex-col rounded-lg">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <span className="text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </div>

        <form
          onSubmit={handleSendMessage}
          className="bg-background sticky bottom-0 flex gap-2 border-t p-4"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputMessage(e.target.value)
            }
            placeholder="Escreva uma mensagem..."
            className="focus:ring-primary bg-background text-foreground flex-1 rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
          />
          <Button
            type="submit"
            className="bg-primary hover:bg-primary/90 text-primary-foreground h-[42px] rounded-md px-4 font-medium transition-colors duration-200"
          >
            Enviar
          </Button>
        </form>
      </div>
    </div>
  )
}
