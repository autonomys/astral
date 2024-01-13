import { useEffect, useState } from 'react'

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string | number
  onChange: (val) => void
  debounceTime?: number
}

const DebouncedInput = ({ value: initialValue, onChange, debounceTime = 300, ...props }: Props) => {
  const [inputValue, setInputValue] = useState(initialValue)

  // setValue if any initialValue changes
  useEffect(() => {
    setInputValue(initialValue)
  }, [initialValue])

  // debounce onChange — triggered on every keypress
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(inputValue)
    }, debounceTime)

    return () => {
      clearTimeout(timeout)
    }
  }, [inputValue, onChange, debounceTime])

  return <input {...props} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
}

export default DebouncedInput
