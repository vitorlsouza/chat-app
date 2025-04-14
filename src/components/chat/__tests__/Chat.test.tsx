import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Chat } from '../Chat'
import { useMessageStore } from '@/store/useMessageStore'
import { useChatSettingsStore } from '@/store/useChatSettingsStore'
import { IMessageProps } from '@/types/chat'
import { useUser } from '@/hooks/useUser'
import { useChat } from '@/hooks/useChat'

vi.mock('@/store/useMessageStore', () => ({
  useMessageStore: vi.fn(),
}))

vi.mock('@/store/useChatSettingsStore', () => ({
  useChatSettingsStore: vi.fn(),
}))

vi.mock('@/hooks/useUser', () => ({
  useUser: vi.fn(),
}))

vi.mock('@/hooks/useChat', () => ({
  useChat: vi.fn(),
}))

describe('Chat', () => {
  const mockMessages: IMessageProps[] = [
    {
      id: '1',
      text: 'Olá, como você está?',
      sender: 'user',
      timestamp: new Date('2025-04-14T10:00:00Z'),
      type: 'text',
      name: 'User',
    },
    {
      id: '2',
      text: 'Estou bem, obrigado!',
      sender: 'bot',
      timestamp: new Date('2025-04-14T10:01:00Z'),
      type: 'text',
      name: 'Bot',
    },
  ]

  const mockUser = {
    id: 1,
    name: 'Fulano',
  }
  let isRecording = false

  const mockAddMessage = vi.fn()
  const mockAddBotResponse = vi.fn()

  const mockChat = {
    messages: mockMessages,
    inputMessage: '',
    setInputMessage: vi.fn(),
    handleKeyDown: vi.fn(),
    handleSubmitButtonClick: vi.fn(() => {
      mockAddMessage({
        text: 'New message',
        sender: 'user',
        type: 'text',
        name: mockUser.name,
      })
    }),
    handleRecordClick: vi.fn(async () => {
      if (isRecording) {
        isRecording = false
        mockAddMessage({
          text: 'Mensagem de áudio',
          sender: 'user',
          type: 'audio',
          audioBase64: 'base64audio',
          name: mockUser.name,
        })
      } else {
        isRecording = true
      }
    }),
    isRecording: false,
    textareaRef: null,
    bottomRef: null,
  }

  beforeEach(() => {
    vi.clearAllMocks()

    const messageStoreMock = useMessageStore as unknown as ReturnType<
      typeof vi.fn
    >
    messageStoreMock.mockImplementation(() => ({
      messages: mockMessages,
      addMessage: mockAddMessage,
      addBotResponse: mockAddBotResponse,
    }))

    const chatSettingsStoreMock = useChatSettingsStore as unknown as ReturnType<
      typeof vi.fn
    >
    chatSettingsStoreMock.mockImplementation(() => ({
      settings: {
        botName: 'Bot',
        userColor: '#000000',
        botColor: '#ffffff',
      },
    }))

    const userMock = useUser as unknown as ReturnType<typeof vi.fn>
    userMock.mockImplementation(() => ({
      user: mockUser,
      updateUserProfile: vi.fn(),
    }))

    const chatMock = useChat as unknown as ReturnType<typeof vi.fn>
    chatMock.mockImplementation(() => mockChat)
  })

  it('should render messages correctly', () => {
    render(<Chat />)

    expect(screen.getByText('Olá, como você está?')).toBeInTheDocument()
    expect(screen.getByText('Estou bem, obrigado!')).toBeInTheDocument()
  })

  it('should send text message', async () => {
    render(<Chat />)

    const input = screen.getByPlaceholderText('Escreva uma mensagem...')
    const sendButton = screen.getByTestId('submit-button')

    fireEvent.change(input, { target: { value: 'New message' } })
    fireEvent.click(sendButton)

    expect(mockAddMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        text: 'New message',
        sender: 'user',
        type: 'text',
        name: mockUser.name,
      }),
    )
  })

  it('should send audio message', async () => {
    render(<Chat />)

    const recordButton = screen.getByTestId('record-button')

    fireEvent.click(recordButton)
    fireEvent.click(recordButton)

    await waitFor(() => {
      expect(mockAddMessage).toHaveBeenCalledWith(
        expect.objectContaining({
          text: 'Mensagem de áudio',
          sender: 'user',
          type: 'audio',
          audioBase64: expect.any(String),
          name: mockUser.name,
        }),
      )
    })
  })
})
