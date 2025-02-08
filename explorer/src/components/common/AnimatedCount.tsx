'use client'

import { useEffect, useRef } from 'react'
import CountUp from 'react-countup'

interface AnimatedCountProps {
  value: number
  duration?: number
  decimals?: number
}

export default function AnimatedCount({ value, duration = 0.5, decimals = 0 }: AnimatedCountProps) {
  const prevValueRef = useRef(value)

  useEffect(() => {
    prevValueRef.current = value
  }, [value])

  const prevValue = prevValueRef.current

  return (
    <CountUp start={prevValue} end={value} duration={duration} decimals={decimals} useEasing={true}>
      {({ countUpRef }) => (
        <p
          className='text-center text-xl font-medium leading-relaxed dark:text-white'
          ref={countUpRef as React.LegacyRef<HTMLParagraphElement>}
        />
      )}
    </CountUp>
  )
}
