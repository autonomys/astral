import _ from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'

interface DebouncedInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number
  onChange: (value: string | number) => void
  delay?: number
}

const DebouncedInput: React.FC<DebouncedInputProps> = ({
  value,
  onChange,
  delay = 300,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value)

  // Update local state when value prop changes
  useEffect(() => {
    setInputValue(value)
  }, [value])

  // Create a debounced version of the passed onChange function
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnChange = useCallback(
    _.debounce((value: string | number) => {
      onChange(value)
    }, delay),
    [onChange, delay],
  )

  // Update debounced value when input changes
  useEffect(() => {
    if (inputValue !== value) {
      debouncedOnChange(inputValue)
    }
    return () => {
      debouncedOnChange.cancel()
    }
  }, [inputValue, debouncedOnChange, value])

  return <input {...props} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
}

export default DebouncedInput
