import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from '@/components/chat/Header'

// Mock para useUser
vi.mock('@/hooks/useUser', () => ({
  useUser: () => ({
    user: { name: 'Vitor' },
  }),
}))

describe('<Header />', () => {
  it('renders the user name and subcomponents', () => {
    render(<Header />)

    expect(screen.getByText(/Chat App - Vitor/)).toBeInTheDocument()

    expect(screen.getByTestId('chat-settings')).toBeInTheDocument()
    expect(screen.getByTestId('profile-selector')).toBeInTheDocument()
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })
})
