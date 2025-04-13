import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { UserProfile } from '@/types/user'
import { getPersonalizedResponse } from '@/utils/responses'
import { Message } from '@/types/chat'
import { v4 as uuidv4 } from 'uuid'

interface MessageState {
  messages: Message[]
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void
  addBotResponse: (user: UserProfile) => void
  clearMessages: () => void
}

export const useMessageStore = create<MessageState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => {
        set((state: MessageState) => ({
          messages: [
            ...state.messages,
            {
              ...message,
              id: uuidv4(),
              timestamp: new Date(),
            },
          ],
        }))
      },
      addBotResponse: (user: UserProfile) => {
        setTimeout(() => {
          set((state: MessageState) => ({
            messages: [
              ...state.messages,
              {
                id: uuidv4(),
                text: getPersonalizedResponse(user),
                sender: 'bot',
                timestamp: new Date(),
                type: 'text',
              },
            ],
          }))
        }, 1000)
      },
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: 'message-storage',
    },
  ),
)
