import React, { useState } from 'react'
import { Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useChatSettingsStore } from '@/store/useChatSettingsStore'
import type { IChatSettingsProps } from '@/types/chat'
import { COLORS_OPTIONS, BOT_COLORS_OPTIONS } from '@/constants/chat'

export const ChatSettings: React.FC = () => {
  const { settings, updateSettings } = useChatSettingsStore()
  const [tempSettings, setTempSettings] = useState<IChatSettingsProps>(settings)
  const [open, setOpen] = useState(false)

  const handleChange = (key: keyof IChatSettingsProps, value: string) => {
    setTempSettings((prev: IChatSettingsProps) => ({
      ...prev,
      [key]: value,
    }))
  }

  const handleSave = () => {
    updateSettings(tempSettings)
    setOpen(false)
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-8 w-8">
          <Settings size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="space-y-4 p-4">
          <div className="space-y-2">
            <label htmlFor="botName" className="text-sm font-medium">
              Nome do Bot
            </label>
            <input
              id="botName"
              type="text"
              value={tempSettings.botName}
              onChange={(e) => handleChange('botName', e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Cor das suas mensagens
            </label>
            <select
              value={tempSettings.userMessageColor}
              onChange={(e) => handleChange('userMessageColor', e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            >
              {COLORS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Cor das mensagens do bot
            </label>
            <select
              value={tempSettings.botMessageColor}
              onChange={(e) => handleChange('botMessageColor', e.target.value)}
              className="w-full rounded-md border px-3 py-2"
            >
              {BOT_COLORS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <Button
            variant="default"
            size="sm"
            onClick={handleSave}
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Salvar
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
