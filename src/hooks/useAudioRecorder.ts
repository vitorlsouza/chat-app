import { useState, useCallback, useEffect } from 'react'
import MicRecorder from 'mic-recorder-to-mp3'

interface UseAudioRecorderProps {
  isRecording: boolean
  startRecording: () => Promise<void>
  stopRecording: () => Promise<string>
  audioUrl: string
  isReady: boolean
}

export function useAudioRecorder(audioBase64?: string): UseAudioRecorderProps {
  const [isRecording, setIsRecording] = useState(false)
  const [recorder, setRecorder] = useState<MicRecorder | null>(null)
  const [audioUrl, setAudioUrl] = useState<string>('')
  const [isReady, setIsReady] = useState(false)

  const startRecording = useCallback(async () => {
    try {
      const newRecorder = new MicRecorder({
        bitRate: 128,
      })

      await newRecorder.start()

      setRecorder(newRecorder)
      setIsRecording(true)
    } catch (err) {
      console.error('Error starting recording', err)
      setIsRecording(false)
      setRecorder(null)
    }
  }, [])

  const stopRecording = useCallback(async (): Promise<string> => {
    if (!recorder) {
      console.log('No recorder instance')
      setIsRecording(false)
      return ''
    }

    try {
      const [, blob] = await recorder.stop().getMp3()

      if (blob.size === 0) {
        setIsRecording(false)
        setRecorder(null)
        return ''
      }

      const base64Audio = await blobToBase64(blob)

      setIsRecording(false)
      setRecorder(null)

      return base64Audio
    } catch (err) {
      console.error('Error processing recording:', err)
      setIsRecording(false)
      setRecorder(null)
      return ''
    }
  }, [recorder])

  const blobToBase64 = async (blob: Blob): Promise<string> => {
    const arrayBuffer = await blob.arrayBuffer()
    const base64 = btoa(
      new Uint8Array(arrayBuffer).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        '',
      ),
    )
    return `data:${blob.type};base64,${base64}`
  }

  useEffect(() => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }

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
  }, [audioBase64])

  return {
    isRecording,
    startRecording,
    stopRecording,
    audioUrl,
    isReady,
  }
}
