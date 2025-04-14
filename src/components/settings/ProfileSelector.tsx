import { useUser } from '@/hooks/useUser'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User } from 'lucide-react'
import { USERS } from '@/constants/user'
export function ProfileSelector() {
  const { updateUser } = useUser()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild data-testid="profile-selector">
        <Button variant="outline" size="icon">
          <User className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Selecionar perfil</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {USERS.map((user) => (
          <DropdownMenuItem
            key={user.value}
            onClick={() => updateUser({ id: user.value, name: user.label })}
          >
            {user.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
