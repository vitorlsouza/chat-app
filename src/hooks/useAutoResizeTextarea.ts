import { useRef, useEffect, useCallback } from 'react'

interface UseAutoResizeTextareaOptions {
  minHeight?: number
  maxHeight?: number
  value: string
}

export const useAutoResizeTextarea = ({
  minHeight = 42,
  maxHeight = 120,
  value,
}: UseAutoResizeTextareaOptions) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`
    }
  }, [maxHeight])

  useEffect(() => {
    adjustHeight()
  }, [value, adjustHeight])

  const resetHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${minHeight}px`
    }
  }

  return {
    textareaRef,
    adjustHeight,
    resetHeight,
  }
}
