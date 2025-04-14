import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IUserProfile } from '@/types/user'
import { getPersonalizedResponse } from '@/utils/responses'
import { IMessageProps } from '@/types/chat'
import { v4 as uuidv4 } from 'uuid'

interface MessageState {
  messages: IMessageProps[]
  addMessage: (message: Omit<IMessageProps, 'id' | 'timestamp'>) => void
  addBotResponse: (user: IUserProfile, botName: string) => void
  clearMessages: () => void
}

export const useMessageStore = create<MessageState>()(
  persist(
    (set) => ({
      messages: [],
      addMessage: (message: Omit<IMessageProps, 'id' | 'timestamp'>) => {
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
      addBotResponse: (user: IUserProfile, botName: string) => {
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
                name: botName,
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
