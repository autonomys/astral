import React, { useEffect, useState } from 'react'

interface GoToPageInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number
  onChange: (value: string | number) => void
}

export const GoToPageInput: React.FC<GoToPageInputProps> = ({ value, onChange, ...props }) => {
  const [inputValue, setInputValue] = useState(value)
  const hasCalledOnChange = React.useRef(false)

  useEffect(() => {
    setInputValue(value)
    hasCalledOnChange.current = false // Reset the flag when value changes
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '')
    setInputValue(numericValue)
    hasCalledOnChange.current = false // Reset the flag when input changes
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !hasCalledOnChange.current) {
      onChange(inputValue)
      hasCalledOnChange.current = true
    }
  }

  const handleBlur = () => {
    if (!hasCalledOnChange.current) {
      onChange(inputValue)
      hasCalledOnChange.current = true
    }
  }

  return (
    <input
      {...props}
      type='text'
      inputMode='numeric'
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    />
  )
}
