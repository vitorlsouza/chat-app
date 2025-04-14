import React from 'react'
import { cn } from '@/lib/utils'
import { useDevice } from '@/hooks/useDevice'
import { useAudioRecorder } from '@/hooks/useAudioRecorder'

interface AudioMessageProps {
  audioBase64: string
}

export const AudioMessage: React.FC<AudioMessageProps> = ({ audioBase64 }) => {
  const { isReady, audioUrl } = useAudioRecorder(audioBase64)
  const { isMobile } = useDevice()

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-lg',
        isMobile ? 'w-[220px]' : 'w-[280px]',
      )}
    >
      {isReady ? (
        <audio
          data-testid="audio-message"
          controls
          controlsList="nodownload noplaybackrate"
          preload="metadata"
          src={audioUrl}
          className={cn('w-full', isMobile ? 'h-[44px]' : 'h-[40px]')}
        />
      ) : (
        <div className="flex w-full items-center justify-center p-2">
          <span className="text-sm">Carregando áudio...</span>
        </div>
      )}
    </div>
  )
}
