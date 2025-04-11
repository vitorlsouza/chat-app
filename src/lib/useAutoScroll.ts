import { Message } from '@/types/chat'
import { useEffect, useRef } from 'react'

export const useAutoScroll = (messages: Message[]) => {
  const bottomRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages?.length])

  return { bottomRef, scrollToBottom }
}
