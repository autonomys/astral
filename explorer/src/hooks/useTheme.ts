import { useEffect, useState } from 'react'
import { useSafeLocalStorage } from './useSafeLocalStorage'

function usePrefersDarkMode() {
  const [value, setValue] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setValue(mediaQuery.matches)

    const handler = () => setValue(mediaQuery.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return value
}

export function useTheme() {
  const prefersDarkMode = usePrefersDarkMode()
  const [isEnabled, setIsEnabled] = useSafeLocalStorage('dark-mode', undefined)

  const enabled = isEnabled === undefined ? prefersDarkMode : isEnabled

  useEffect(() => {
    if (window === undefined) return
    const root = window.document.documentElement
    root.classList.remove(enabled ? 'light' : 'dark')
    root.classList.add(enabled ? 'dark' : 'light')
  }, [enabled])

  const toggleTheme = () => setIsEnabled(!enabled)

  return [enabled, toggleTheme]
}
