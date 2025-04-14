export type MessageType = 'text' | 'audio'

export interface IMessageProps {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  type: MessageType
  audioUrl?: string
  audioBase64?: string
  name?: string
}

export interface IChatSettingsProps {
  botName: string
  userMessageColor: string
  botMessageColor: string
}
