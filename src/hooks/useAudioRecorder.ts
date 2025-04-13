import { useState, useCallback } from 'react'
import MicRecorder from 'mic-recorder-to-mp3'

interface UseAudioRecorderReturn {
  isRecording: boolean
  startRecording: () => Promise<void>
  stopRecording: () => Promise<string>
}

export function useAudioRecorder(): UseAudioRecorderReturn {
  const [isRecording, setIsRecording] = useState(false)
  const [recorder, setRecorder] = useState<MicRecorder | null>(null)

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

  return {
    isRecording,
    startRecording,
    stopRecording,
  }
}
