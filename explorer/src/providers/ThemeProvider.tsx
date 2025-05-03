'use client'

import React, { FC, ReactNode, createContext, useContext, useEffect } from 'react'
import { usePreferencesStates } from 'states/preferences'

function usePrefersDarkMode() {
  const darkMode = usePreferencesStates((state) => state.darkMode)
  const setDarkMode = usePreferencesStates((state) => state.setDarkMode)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    setDarkMode(mediaQuery.matches)
    const handler = () => setDarkMode(mediaQuery.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [setDarkMode])

  return darkMode
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
  usePrefersDarkMode()
  const isDark = usePreferencesStates((state) => state.darkMode)
  const setDarkMode = usePreferencesStates((state) => state.setDarkMode)

  useEffect(() => {
    if (window === undefined) return

    const root = window.document.documentElement
    root.classList.remove(isDark ? 'light' : 'dark')
    root.classList.add(isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setDarkMode(!isDark)

  return (
    <ThemeContext.Provider
      value={{
        toggleTheme,
        isDark,
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
