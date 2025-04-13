import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface AudioMessageProps {
  audioBase64: string
  isUser: boolean
}

export const AudioMessage: React.FC<AudioMessageProps> = ({
  audioBase64,
  isUser,
}) => {
  const [audioUrl, setAudioUrl] = useState<string>('')
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!audioBase64) return

    try {
      const processAudio = async () => {
        const base64WithoutPrefix = audioBase64.replace(
          /^data:audio\/mp3;base64,/,
          '',
        )

        const binaryString = window.atob(base64WithoutPrefix)

        const bytes = new Uint8Array(binaryString.length)
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i)
        }

        const blob = new Blob([bytes], { type: 'audio/mp3' })
        const url = URL.createObjectURL(blob)

        setAudioUrl(url)
        setIsReady(true)
      }

      processAudio()
    } catch (error) {
      console.error('Error processing audio:', error)
      setIsReady(false)
    }

    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioBase64])

  return (
    <div
      className={cn(
        'flex min-w-[300px] items-center gap-2 rounded-lg p-2',
        isUser
          ? 'bg-blue-600 text-white'
          : 'bg-secondary text-secondary-foreground',
      )}
    >
      {isReady ? (
        <audio controls src={audioUrl} className="w-full" />
      ) : (
        <div className="flex w-full items-center justify-center p-2">
          <span className="text-sm">Carregando áudio...</span>
        </div>
      )}
    </div>
  )
}
