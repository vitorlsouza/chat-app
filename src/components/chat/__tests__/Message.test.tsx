import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Message } from '@/components/chat/Message'
import { IMessageProps } from '@/types/chat'

// Mock para useChatSettingsStore
vi.mock('@/store/useChatSettingsStore', () => ({
  useChatSettingsStore: () => ({
    settings: {
      userMessageColor: 'bg-blue-200',
      botMessageColor: 'bg-gray-200',
    },
  }),
}))

// Mock para useAudioRecorder
vi.mock('@/hooks/useAudioRecorder', () => ({
  useAudioRecorder: (audioBase64: string) => ({
    isReady: true,
    audioUrl: `mocked-url-from-${audioBase64}`,
  }),
}))

// Mock para useDevice
vi.mock('@/hooks/useDevice', () => ({
  useDevice: () => ({
    isMobile: false,
  }),
}))

describe('<Message />', () => {
  const baseMessage: IMessageProps = {
    id: '1',
    text: 'Olá, como você está?',
    sender: 'user',
    timestamp: new Date('2025-04-14T10:00:00Z'),
    type: 'text',
    name: 'Fulano',
  }

  it('renders a text message', () => {
    render(<Message message={baseMessage} />)
    expect(screen.getByText('Olá, como você está?')).toBeInTheDocument()
    expect(screen.getByText('Fulano')).toBeInTheDocument()
  })

  it('renders an audio message when isReady is true', () => {
    const audioMessage: IMessageProps = {
      ...baseMessage,
      type: 'audio',
      text: '',
      audioBase64: 'fakebase64',
    }

    render(<Message message={audioMessage} />)

    const audio = screen.getByTestId('audio-message') as HTMLAudioElement
    expect(audio).toBeInTheDocument()
    expect(audio.src).toContain('mocked-url-from-fakebase64')
  })

  it('applies the correct user color class', () => {
    render(<Message message={baseMessage} />)
    const bubble = screen.getByText('Olá, como você está?').closest('div')
    expect(bubble?.className).toContain('bg-blue-200')
  })

  it('applies the correct bot color class', () => {
    const botMessage = {
      ...baseMessage,
      sender: 'bot' as 'user' | 'bot',
      text: 'Olá, como você está?',
    }
    render(<Message message={botMessage} />)
    const bubble = screen.getByText('Olá, como você está?').closest('div')
    expect(bubble?.className).toContain('bg-gray-200')
  })
})
