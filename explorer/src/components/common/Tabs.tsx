'use client'

import { cn } from '@/utils/cn'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, {
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

const generateIdFromTitle = (title: string) => {
  return title
    .replace(/[^\w\s]/gi, '')
    .replace(/\d+/g, '')
    .replace(/\s+(.)/g, (_, c) => c.toUpperCase())
    .replace(/\s/g, '')
    .replace(/^(.)/, (_, c) => c.toLowerCase())
}

type TabProps = {
  id?: string
  title: string
  children?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}

export const Tab: React.FC<TabProps> = ({ id, children }) => {
  return <div id={id}>{children}</div>
}

type TabTitleProps = {
  id?: string
  title: string
  index: number
  isSelected: boolean
  setSelectedTab: (index: number | string) => void
  pillStyle: string
  activePillStyle: string
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}

export const TabTitle: React.FC<TabTitleProps> = ({
  id,
  title,
  setSelectedTab,
  isSelected,
  index,
  onClick,
  pillStyle,
  activePillStyle,
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const handleOnClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (id) {
        setSelectedTab(id)
        const params = new URLSearchParams(searchParams.toString())
        params.set('tab', id)
        router.push(`${pathname}?${params.toString()}`, {
          scroll: false,
        })
      } else {
        setSelectedTab(index)
        const generatedId = generateIdFromTitle(title)
        if (generatedId) {
          const params = new URLSearchParams(searchParams.toString())
          params.set('tab', generatedId)
          router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
          })
        }
      }
      if (onClick) onClick(e)
    },
    [setSelectedTab, index, title, id, onClick, searchParams, router, pathname],
  )

  return (
    <li className='-mb-px w-full text-center last:mr-0 lg:w-auto'>
      <button
        className={cn(
          'block w-full rounded-full px-[13.8px] py-3 text-xs font-semibold leading-normal lg:w-auto',
          isSelected ? activePillStyle : pillStyle,
        )}
        onClick={handleOnClick}
      >
        {title}
      </button>
    </li>
  )
}

type TabsProps = {
  children: ReactElement[] | ReactElement
  initialIndex?: number
  pillStyle?: string
  activePillStyle?: string
  tabStyle?: string
  tabTitleStyle?: string
}

export const Tabs: React.FC<TabsProps> = ({
  children,
  initialIndex = 0,
  tabStyle = 'bg-white border border-slate-100 shadow rounded-lg p-4',
  tabTitleStyle = '',
  pillStyle = 'text-gray-600 bg-white dark:bg-transparent dark:text-white',
  activePillStyle = 'text-white bg-grayDarker dark:bg-blueAccent',
}) => {
  const [selectedTab, setSelectedTab] = useState<number | string>(initialIndex)
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')

  const updateSelectedTab = useCallback(() => {
    if (tabParam && Array.isArray(children)) {
      const tabIndex = children.findIndex(
        (child) =>
          generateIdFromTitle(child.props.title) === tabParam || child.props.id === tabParam,
      )
      if (tabIndex !== -1) {
        setSelectedTab(tabIndex)
      }
    }
  }, [tabParam, children])

  useEffect(() => {
    updateSelectedTab()
  }, [updateSelectedTab])

  return (
    <div className={cn('flex flex-wrap', tabStyle)}>
      <div className='w-full'>
        <ul
          className={cn('flex w-full list-none flex-row flex-wrap pb-4 pt-3', tabTitleStyle)}
          role='tablist'
        >
          {Array.isArray(children) ? (
            children.map((item, index) => (
              <TabTitle
                key={index}
                id={item.props.id}
                title={item.props.title}
                onClick={item.props.onClick}
                index={index}
                isSelected={selectedTab === index}
                setSelectedTab={setSelectedTab}
                pillStyle={pillStyle}
                activePillStyle={activePillStyle}
              />
            ))
          ) : (
            <TabTitle
              id={children.props.id}
              title={children.props.title}
              onClick={children.props.onClick}
              index={0}
              isSelected={selectedTab === 0}
              setSelectedTab={setSelectedTab}
              pillStyle={pillStyle}
              activePillStyle={activePillStyle}
            />
          )}
        </ul>
        {Array.isArray(children)
          ? children[
              typeof selectedTab === 'string'
                ? children.findIndex((child) => child.props.id === selectedTab)
                : selectedTab
            ]
          : children}
      </div>
    </div>
  )
}
