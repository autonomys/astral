'use client'

import React, { useEffect, useState } from 'react'

interface LazyLoaderProps {
  children: React.ReactNode
  preload?: boolean
  onLoad?: () => void
  fallback?: React.ReactNode
}

export const LazyLoader: React.FC<LazyLoaderProps> = ({
  children,
  preload = false,
  onLoad,
  fallback = <div>Loading...</div>,
}) => {
  const [isLoaded, setIsLoaded] = useState(!preload)

  useEffect(() => {
    if (preload) {
      // Simulate loading time for heavy components
      const timer = setTimeout(() => {
        setIsLoaded(true)
        onLoad?.()
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [preload, onLoad])

  if (!isLoaded) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

// Component for preloading heavy libraries
export const LibraryPreloader: React.FC<{
  libraries: Array<() => Promise<unknown>>
  onComplete?: () => void
}> = ({ libraries, onComplete }) => {
  useEffect(() => {
    const loadLibraries = async () => {
      const promises = libraries.map(async (loader) => {
        try {
          await loader()
        } catch (error) {
          console.error('Failed to load library:', error)
        }
      })

      await Promise.all(promises)
      onComplete?.()
    }

    loadLibraries()
  }, [libraries, onComplete])

  return null
}

// Hook for preloading specific libraries
export const usePreloadLibraries = (libraries: Array<() => Promise<unknown>>) => {
  const [isPreloading, setIsPreloading] = useState(false)
  const [preloadedCount, setPreloadedCount] = useState(0)

  const preload = async () => {
    if (isPreloading) return

    setIsPreloading(true)

    const promises = libraries.map(async (loader) => {
      try {
        await loader()
        setPreloadedCount((prev) => prev + 1)
      } catch (error) {
        console.error('Failed to preload library:', error)
      }
    })

    await Promise.all(promises)
    setIsPreloading(false)
  }

  return { preload, isPreloading, preloadedCount, total: libraries.length }
}
