import { USER_RESPONSES, BOT_RESPONSES } from '@/constants/responses'
import { UserProfile } from '@/types/user'

export function getPersonalizedResponse(user: UserProfile): string {
  const responses =
    USER_RESPONSES[user.id.toString() as keyof typeof USER_RESPONSES]
  return responses[Math.floor(Math.random() * responses.length)]
}

export const getRandomResponse = (): string => {
  const randomIndex = Math.floor(Math.random() * BOT_RESPONSES.length)
  return BOT_RESPONSES[randomIndex]
}
