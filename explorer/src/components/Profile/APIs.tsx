'use client'

import dynamic from 'next/dynamic'
import { useParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import 'swagger-ui-react/swagger-ui.css'

const DynamicSwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false })

export const APIs: FC = () => {
  const { chain } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [specData, setSpecData] = useState(null)

  // Apply dark mode styling
  useEffect(() => {
    const applyDarkModeStyles = () => {
      const isDarkMode = document.documentElement.classList.contains('dark')
      const swaggerUiElement = document.querySelector('.swagger-ui')
      if (!isLoading && swaggerUiElement) {
        if (isDarkMode) {
          swaggerUiElement.classList.add('swagger-ui-dark')
        } else {
          swaggerUiElement.classList.remove('swagger-ui-dark')
        }
      }
    }
    applyDarkModeStyles()
    const observer = new MutationObserver(applyDarkModeStyles)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [specData, isLoading])

  useEffect(() => {
    const fetchSpecData = async () => {
      setIsLoading(true)
      try {
        let url = process.env.NEXT_PUBLIC_TAURUS_API_DOCS_URL
        if (chain === 'mainnet') {
          url = process.env.NEXT_PUBLIC_MAINNET_API_DOCS_URL
        }
        if (!url) {
          throw new Error('API docs URL is not defined')
        }
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`Failed to fetch API specification: ${response.status}`)
        }
        const data = await response.json()
        setSpecData(data)
      } catch (error) {
        console.error('Error fetching Swagger specification:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchSpecData()
  }, [chain])

  return (
    <div className='container mx-auto'>
      <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-boxDark'>
        {isLoading ? (
          <div className='flex h-64 items-center justify-center'>
            <div className='border-primary h-12 w-12 animate-spin rounded-lg border-b-2 border-t-2'></div>
          </div>
        ) : (
          <DynamicSwaggerUI spec={specData} />
        )}
      </div>
    </div>
  )
}
