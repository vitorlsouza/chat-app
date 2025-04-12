import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAutoScroll } from '@/hooks/useAutoScroll'
import { Header } from './Header'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { Send } from 'lucide-react'
import { useAutoResizeTextarea } from '@/hooks/useAutoResizeTextarea'
import { useDevice } from '@/hooks/useDevice'
import { formatHours } from '@/utils/hours'
import { useUser } from '@/hooks/useUser'
import { ProfileSelector } from './ProfileSelector'
import { getPersonalizedResponse } from '@/utils/responses'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export const Chat: React.FC = () => {
  const { messages, setMessages } = useLocalStorage('chat-messages')
  const [inputMessage, setInputMessage] = useState('')
  const { bottomRef } = useAutoScroll(messages)
  const { isMobile } = useDevice()
  const { textareaRef, resetHeight } = useAutoResizeTextarea({
    value: inputMessage,
  })
  const { user } = useUser()

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    }

    setMessages((prevMessages: Message[]) => [...prevMessages, userMessage])
    setInputMessage('')

    resetHeight()

    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getPersonalizedResponse(user),
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages((prevMessages: Message[]) => [...prevMessages, botMessage])
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !isMobile && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage(e)
    }
  }

  const handleSubmitButtonClick = (e: React.MouseEvent) => {
    e.preventDefault()
    handleSendMessage(e)
  }

  return (
    <div className="flex h-screen w-full flex-col pt-16">
      <Header>
        <ProfileSelector />
      </Header>
      <div className="bg-background text-foreground mt-4 flex flex-1 flex-col rounded-lg">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`animate__animated animate__messageIn flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex max-w-[70%] flex-col gap-2 rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'animate__animated animate__messageInRight bg-blue-600 text-white dark:bg-blue-500'
                      : 'bg-secondary text-secondary-foreground animate__animated animate__messageInLeft'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <span className="flex justify-end text-xs opacity-70">
                    {formatHours(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </div>

        <div className="bg-background sticky bottom-0 flex gap-2 border-t p-4">
          <textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setInputMessage(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Escreva uma mensagem..."
            className="focus:ring-primary bg-background text-foreground flex-1 resize-none rounded-md border px-3 py-2 focus:ring-2 focus:outline-none"
            rows={1}
            style={{ minHeight: '42px', maxHeight: '120px' }}
          />
          {isMobile ? (
            <div className="flex h-[42px] w-[42px] items-center justify-center rounded-md bg-blue-600 text-white">
              <Send size={20} onClick={handleSubmitButtonClick} />
            </div>
          ) : (
            <Button
              type="button"
              onClick={handleSubmitButtonClick}
              className="h-[42px] rounded-md bg-blue-600 px-4 font-medium text-white transition-colors duration-200 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Enviar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
