import { FC, useState, createContext, useContext, ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

type ContextValue = {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ContextValue>(
  // @ts-expect-error It's a good practice not to give a default value even though the linter tells you so
  {},
)

const ThemeProvider: FC<Props> = ({ children }) => {
  const [isDark, setToggle] = useState(false)
  const toggleTheme = () => setToggle(!isDark)
  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>
  )
}
export { ThemeContext, ThemeProvider }

export const useTheme = (): ContextValue => {
  const context = useContext(ThemeContext)

  if (!context) throw new Error('ThemeContext must be used within ThemeProvider')

  return context
}
