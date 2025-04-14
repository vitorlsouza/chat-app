import { DEFAULT_BOT_COLOR } from '@/constants/chat'
import { DEFAULT_USER_COLOR } from '@/constants/chat'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface IChatSettings {
  botName: string
  userMessageColor: string
  botMessageColor: string
}

interface IChatSettingsStore {
  settings: IChatSettings
  updateSettings: (settings: IChatSettings) => void
}

export const useChatSettingsStore = create<IChatSettingsStore>()(
  persist(
    (set) => ({
      settings: {
        botName: 'Bot',
        userMessageColor: DEFAULT_USER_COLOR,
        botMessageColor: DEFAULT_BOT_COLOR,
      },
      updateSettings: (newSettings) => set({ settings: newSettings }),
    }),
    {
      name: 'chat-settings',
    },
  ),
)
