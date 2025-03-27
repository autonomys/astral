'use client'

import React, { FC, ReactNode, createContext, useContext, useEffect, useState } from 'react'

// common
import { useSafeLocalStorage } from 'hooks/useSafeLocalStorage'

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

type Value = {
  isDark: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<Value>(
  // @ts-expect-error It's a good practice not to give a default value even though the linter tells you so
  {},
)

type Props = {
  children?: ReactNode
}

export const ThemeProvider: FC<Props> = ({ children }) => {
  const prefersDarkMode = usePrefersDarkMode()
  const [isEnabled, setIsEnabled] = useSafeLocalStorage('dark-mode', prefersDarkMode)

  useEffect(() => {
    if (window === undefined) return
    const enabled = isEnabled === undefined ? prefersDarkMode : isEnabled

    const root = window.document.documentElement
    root.classList.remove(enabled ? 'light' : 'dark')
    root.classList.add(enabled ? 'dark' : 'light')
    setIsEnabled(enabled)
  }, [prefersDarkMode, setIsEnabled, isEnabled])

  const toggleTheme = () => setIsEnabled(!isEnabled)

  return (
    <ThemeContext.Provider
      value={{
        toggleTheme,
        isDark: isEnabled,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): Value => {
  const context = useContext(ThemeContext)

  if (!context) throw new Error('ThemeContext must be used within ThemeProvider')

  return context
}
