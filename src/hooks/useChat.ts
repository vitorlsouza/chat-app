import { useState } from 'react'
import { useUser } from './useUser'
import { useMessageStore } from '@/store/useMessageStore'
import { useAutoScroll } from './useAutoScroll'
import { useAutoResizeTextarea } from './useAutoResizeTextarea'
import { useAudioRecorder } from './useAudioRecorder'
import { useDevice } from './useDevice'

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

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputMessage.trim()) return

    addMessage({
      text: inputMessage,
      sender: 'user',
      type: 'text',
    })

    setInputMessage('')
    resetHeight()
    addBotResponse(user)
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

  const handleRecordClick = async () => {
    if (isRecording) {
      try {
        const audioBase64 = await stopRecording()
        if (audioBase64) {
          addMessage({
            text: 'Mensagem de áudio',
            sender: 'user',
            type: 'audio',
            audioBase64,
          })
          addBotResponse(user)
        }
      } catch (error) {
        console.error('Error recording audio:', error)
      }
    } else {
      await startRecording()
    }
  }

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
