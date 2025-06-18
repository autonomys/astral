import { useEffect, useState } from 'react'

interface LazyLoadOptions {
  threshold?: number
  rootMargin?: string
  trigger?: 'intersection' | 'hover' | 'click'
}

export function useLazyLoad<T>(
  loader: () => Promise<T>,
  options: LazyLoadOptions = {},
): [T | null, boolean, () => void] {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [triggered, setTriggered] = useState(false)

  const { threshold = 0.1, rootMargin = '50px', trigger = 'intersection' } = options

  const load = async () => {
    if (triggered || loading) return

    setTriggered(true)
    setLoading(true)

    try {
      const result = await loader()
      setData(result)
    } catch (error) {
      console.error('Lazy load failed:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (trigger === 'intersection') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !triggered) {
              load()
            }
          })
        },
        { threshold, rootMargin },
      )

      // Create a dummy element to observe
      const dummyElement = document.createElement('div')
      observer.observe(dummyElement)

      return () => {
        observer.disconnect()
      }
    }
  }, [trigger, threshold, rootMargin, triggered])

  return [data, loading, load]
}

// Hook for lazy loading heavy libraries
export function useLazyLibrary<T>(loader: () => Promise<T>): [T | null, boolean, () => void] {
  return useLazyLoad(loader, { trigger: 'click' })
}

// Hook for lazy loading components on hover
export function useLazyHover<T>(loader: () => Promise<T>): [T | null, boolean, () => void] {
  return useLazyLoad(loader, { trigger: 'hover' })
}
