import React, { memo, useMemo } from 'react'
import { formatHours } from '@/utils/hours'
import { AudioMessage } from './AudioMessage'
import { IMessageProps } from '@/types/chat'
import { useChatSettingsStore } from '@/store/useChatSettingsStore'

interface MessageProps {
  message: IMessageProps
}

export const Message: React.FC<MessageProps> = memo(({ message }) => {
  const { settings } = useChatSettingsStore()

  const messageColor = useMemo(() => {
    return message.sender === 'user'
      ? settings.userMessageColor
      : settings.botMessageColor
  }, [message.sender, settings.userMessageColor, settings.botMessageColor])

  return (
    <div
      key={message.id}
      className={`animate__animated animate__messageIn flex ${
        message.sender === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div className="flex max-w-[70%] flex-col">
        <div className="mb-1 text-sm font-medium text-gray-500">
          {message.name}
        </div>
        <div
          className={`flex flex-col gap-2 rounded-lg p-3 ${
            message.sender === 'user'
              ? 'animate__animated animate__messageInRight'
              : 'animate__animated animate__messageInLeft'
          } ${messageColor}`}
        >
          {message.type === 'audio' ? (
            <AudioMessage audioBase64={message.audioBase64 || ''} />
          ) : (
            <p className="text-sm whitespace-pre-wrap">{message.text}</p>
          )}
          <span className="flex justify-end text-xs opacity-70">
            {formatHours(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  )
})
