export type MessageType = 'text' | 'audio'

export type Message = {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  type: MessageType
  audioUrl?: string
  audioBase64?: string
}
