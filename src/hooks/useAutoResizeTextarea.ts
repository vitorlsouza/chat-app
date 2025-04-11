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
      // Resetar a altura para o valor padrão
      textarea.style.height = 'auto'
      // Definir a altura com base no conteúdo
      textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`
    }
  }, [maxHeight])

  // Ajustar a altura do textarea quando o conteúdo mudar
  useEffect(() => {
    adjustHeight()
  }, [value, adjustHeight])

  // Resetar a altura do textarea
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
