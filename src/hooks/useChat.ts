import { useState, useCallback } from 'react'
import { useUser } from './useUser'
import { useMessageStore } from '@/store/useMessageStore'
import { useAutoScroll } from './useAutoScroll'
import { useAutoResizeTextarea } from './useAutoResizeTextarea'
import { useAudioRecorder } from './useAudioRecorder'
import { useDevice } from './useDevice'
import { useChatSettingsStore } from '@/store/useChatSettingsStore'

export const useChat = () => {
  const [inputMessage, setInputMessage] = useState('')
  const { messages, addMessage, addBotResponse } = useMessageStore()
  const { bottomRef } = useAutoScroll(messages)
  const { isMobile } = useDevice()
  const { textareaRef, resetHeight } = useAutoResizeTextarea({
    value: inputMessage,
  })
  const { user } = useUser()
  const { isRecording, startRecording, stopRecording } = useAudioRecorder()
  const { settings } = useChatSettingsStore()

  const handleSendMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!inputMessage.trim()) return

      addMessage({
        text: inputMessage,
        sender: 'user',
        type: 'text',
        name: user.name,
      })

      setInputMessage('')
      resetHeight()
      addBotResponse(user, settings.botName)
    },
    [
      inputMessage,
      user,
      settings.botName,
      addMessage,
      resetHeight,
      addBotResponse,
    ],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !isMobile && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage(e)
      }
    },
    [isMobile, handleSendMessage],
  )

  const handleSubmitButtonClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      handleSendMessage(e)
    },
    [handleSendMessage],
  )

  const handleRecordClick = useCallback(async () => {
    if (isRecording) {
      try {
        const audioBase64 = await stopRecording()
        if (audioBase64) {
          addMessage({
            text: 'Mensagem de áudio',
            sender: 'user',
            type: 'audio',
            audioBase64,
            name: user.name,
          })
          addBotResponse(user, settings.botName)
        }
      } catch (error) {
        console.error('Error recording audio:', error)
      }
    } else {
      await startRecording()
    }
  }, [
    isRecording,
    startRecording,
    stopRecording,
    addMessage,
    user,
    settings.botName,
    addBotResponse,
  ])

  return {
    handleKeyDown,
    handleSubmitButtonClick,
    handleRecordClick,
    isRecording,
    inputMessage,
    setInputMessage,
    textareaRef,
    resetHeight,
    messages,
    bottomRef,
  }
}
