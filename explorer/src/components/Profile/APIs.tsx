'use client'

import { EXTERNAL_ROUTES } from '@/constants/routes'
import { useParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

export const APIs: FC = () => {
  const { chain } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [specData, setSpecData] = useState(null)

  // Apply dark mode styling
  useEffect(() => {
    const applyDarkModeStyles = () => {
      const isDarkMode = document.documentElement.classList.contains('dark')
      const swaggerUiElement = document.querySelector('.swagger-ui')

      if (swaggerUiElement) {
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
  }, [])

  useEffect(() => {
    const fetchSpecData = async () => {
      setIsLoading(true)
      try {
        let url = EXTERNAL_ROUTES.autoMainnetSwaggerApi
        if (chain === 'taurus') {
          url = EXTERNAL_ROUTES.autoTestnetSwaggerApi
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
            <div className='border-primary h-12 w-12 animate-spin rounded-full border-b-2 border-t-2'></div>
          </div>
        ) : (
          <SwaggerUI spec={specData} />
        )}
      </div>
    </div>
  )
}
