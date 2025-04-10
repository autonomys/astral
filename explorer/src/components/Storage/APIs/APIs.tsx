'use client'

import { useParams } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import swagger from './swagger.json'
export const APIs: FC = () => {
  const { chain } = useParams()
  const [filteredSpec, setFilteredSpec] = useState(swagger)

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

  // Filter swagger spec based on network selection
  useEffect(() => {
    // Deep clone the swagger spec to avoid mutating the original
    const specCopy = JSON.parse(JSON.stringify(swagger))
    console.log('specCopy', specCopy)

    // Filter servers based on selected network
    if (chain === 'taurus') {
      specCopy.servers = specCopy.servers.filter((server: { description: string }) =>
        server.description.toLowerCase().includes('testnet'),
      )
    } else if (chain === 'mainnet') {
      specCopy.servers = specCopy.servers.filter((server: { description: string }) =>
        server.description.toLowerCase().includes('mainnet'),
      )
    }

    setFilteredSpec(specCopy)
  }, [chain])

  return (
    <div className='container mx-auto'>
      <div className='rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-boxDark'>
        <SwaggerUI spec={filteredSpec} />
      </div>
    </div>
  )
}
