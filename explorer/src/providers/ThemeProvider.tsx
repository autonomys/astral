'use client'

import React, {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { ThemeMode, usePreferencesStates } from 'states/preferences'

function useSystemThemeDetection() {
  const [systemIsDark, setSystemIsDark] = useState<boolean | null>(null)

  const handleSystemThemeChange = useCallback(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setSystemIsDark(mediaQuery.matches)

    const handler = () => setSystemIsDark(mediaQuery.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    handleSystemThemeChange()
  }, [handleSystemThemeChange])

  return systemIsDark
}

type Value = {
  themeMode: ThemeMode
  isDark: boolean
  toggleTheme: () => void
  setThemeMode: (mode: ThemeMode) => void
}

const ThemeContext = createContext<Value>(
  // @ts-expect-error It's a good practice not to give a default value even though the linter tells you so
  {},
)

type Props = {
  children?: ReactNode
}

export const ThemeProvider: FC<Props> = ({ children }) => {
  const systemIsDark = useSystemThemeDetection()
  const themeMode = usePreferencesStates((state) => state.themeMode)
  const setThemeMode = usePreferencesStates((state) => state.setThemeMode)
  const setDarkMode = usePreferencesStates((state) => state.setDarkMode)

  // Determine if dark mode should be active based on current mode
  const isDark = useCallback(() => {
    if (themeMode === 'system') {
      return !!systemIsDark
    }
    return themeMode === 'dark'
  }, [themeMode, systemIsDark])

  // Apply theme to DOM
  useEffect(() => {
    if (typeof window === 'undefined' || systemIsDark === null) return

    const enabled = isDark()

    const root = window.document.documentElement
    root.classList.remove(enabled ? 'light' : 'dark')
    root.classList.add(enabled ? 'dark' : 'light')

    // Keep darkMode state in sync for backward compatibility
    setDarkMode(enabled)
  }, [systemIsDark, themeMode, isDark, setDarkMode])

  // Toggle between dark and light mode
  const toggleTheme = useCallback(() => {
    if (themeMode === 'system') {
      setThemeMode(systemIsDark ? 'light' : 'dark')
    } else if (themeMode === 'dark') {
      setThemeMode('light')
    } else {
      setThemeMode('dark')
    }
  }, [themeMode, systemIsDark, setThemeMode])

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        isDark: isDark(),
        toggleTheme,
        setThemeMode,
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
