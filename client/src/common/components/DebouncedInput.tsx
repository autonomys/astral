import { useEffect, useState } from 'react'

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number
  onChange: (val: string | number) => void
  debounceTime?: number
}

const DebouncedInput = ({ value: initialValue, onChange, debounceTime = 300, ...props }: Props) => {
  const [value, setValue] = useState(initialValue)

  // setValue if any initialValue changes
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  // debounce onChange — triggered on every keypress
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounceTime)

    return () => {
      clearTimeout(timeout)
    }
  }, [value, onChange, debounceTime])

  return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />
}

export default DebouncedInput
