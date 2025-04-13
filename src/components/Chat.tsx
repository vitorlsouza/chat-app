import React from 'react'
import { Button } from '@/components/ui/button'
import { Header } from './Header'
import { Mic, Send, Square } from 'lucide-react'
import { formatHours } from '@/utils/hours'
import { ProfileSelector } from './ProfileSelector'
import { AudioMessage } from './AudioMessage'
import { useChat } from '@/hooks/useChat'
import { useDevice } from '@/hooks/useDevice'

export const Chat: React.FC = () => {
  const {
    messages,
    inputMessage,
    setInputMessage,
    handleKeyDown,
    handleSubmitButtonClick,
    handleRecordClick,
    isRecording,
    textareaRef,
    bottomRef,
  } = useChat()

  const { isMobile } = useDevice()

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
                  {message.type === 'audio' ? (
                    <AudioMessage
                      audioBase64={message.audioBase64 || ''}
                      isUser={message.sender === 'user'}
                    />
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">
                      {message.text}
                    </p>
                  )}
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
          <Button
            type="button"
            onClick={handleRecordClick}
            variant={isRecording ? 'destructive' : 'outline'}
            size="icon"
            className="h-[42px] w-[42px]"
          >
            {isRecording ? <Square size={20} /> : <Mic size={20} />}
          </Button>
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
