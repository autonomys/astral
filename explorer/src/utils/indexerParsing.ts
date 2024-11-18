export const parseLogValue = (logValue: string | null | undefined) => {
  const defaultValue = { data: '-', engine: '-' }
  if (!logValue) return defaultValue
  try {
    return JSON.parse(logValue) as { data: string; engine?: string }
  } catch (error) {
    return defaultValue
  }
}

export const parseArgs = (args: string | null | undefined) => {
  if (!args) return {}
  try {
    return JSON.parse(args) as object
  } catch (error) {
    return {}
  }
}
