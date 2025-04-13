export interface Message {
  id: string
  content: string
  timestamp: number
  isUser: boolean
  audioBase64?: string
  duration?: number
}
