export const formatSeconds = (seconds: number | bigint): string => {
  if (typeof seconds === 'number' && seconds < 0) {
    throw new Error('Seconds cannot be negative')
  } else if (typeof seconds === 'bigint' && seconds < 0n) {
    throw new Error('Seconds cannot be negative')
  }

  const timeUnits = [
    { unit: 'd', value: 86400n },
    { unit: 'h', value: 3600n },
    { unit: 'm', value: 60n },
    { unit: 's', value: 1n },
  ]

  let secondsBigInt = BigInt(seconds)

  return (
    timeUnits
      .reduce((result, { unit, value }) => {
        if (secondsBigInt >= value) {
          const time = secondsBigInt / value
          secondsBigInt %= value
          result += `${time}${unit} `
        }
        return result
      }, '')
      .trim() || '0s'
  )
}
