'use client'

import { useSearchParams } from 'next/navigation'
import React, {
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

type TabProps = {
  title: string
  id?: string
  children?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}

export const Tab: React.FC<TabProps> = ({ children }) => {
  return <div>{children}</div>
}

type TabTitleProps = {
  title: string
  id?: string
  index: number
  isSelected: boolean
  setSelectedTab: (index: number) => void
  pillStyle: string
  activePillStyle: string
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined
}

export const TabTitle: React.FC<TabTitleProps> = ({
  title,
  id,
  setSelectedTab,
  isSelected,
  index,
  onClick,
  pillStyle,
  activePillStyle,
}) => {
  const handleOnClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setSelectedTab(index)

      if (id) {
        const url = new URL(window.location.href)
        const currentParams = url.searchParams.toString()
        url.searchParams.set('tab', id)
        const newParams = url.searchParams.toString()
        if (currentParams !== newParams) {
          window.history.pushState(null, '', `${url.pathname}${newParams ? '?' + newParams : ''}`)
        }
      }

      if (onClick) onClick(e)
    },
    [onClick, setSelectedTab, index, id],
  )

  return (
    <li className='-mb-px w-full text-center last:mr-0 lg:w-auto'>
      <button
        className={
          'block w-full rounded-full px-[13.8px] py-3 text-xs font-semibold leading-normal lg:w-auto ' +
          (isSelected ? `${activePillStyle}` : `${pillStyle}`)
        }
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
  const [selectedTab, setSelectedTab] = useState(initialIndex)
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')

  const updateSelectedTab = useCallback(() => {
    if (tabParam && Array.isArray(children)) {
      const tabIndex = children.findIndex((child) => child.props.id === tabParam)
      if (tabIndex !== -1) {
        setSelectedTab(tabIndex)
      }
    }
  }, [tabParam, children])

  useEffect(() => {
    updateSelectedTab()
  }, [updateSelectedTab])

  return (
    <div className={`flex flex-wrap ${tabStyle}`}>
      <div className='w-full'>
        <ul
          className={`flex w-full list-none flex-row flex-wrap pb-4 pt-3 ${tabTitleStyle}`}
          role='tablist'
        >
          {Array.isArray(children) ? (
            children.map((item, index) => (
              <TabTitle
                key={index}
                title={item.props.title}
                id={item.props.id}
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
              title={children.props.title}
              id={children.props.id}
              onClick={children.props.onClick}
              index={0}
              isSelected={selectedTab === 0}
              setSelectedTab={setSelectedTab}
              pillStyle={pillStyle}
              activePillStyle={activePillStyle}
            />
          )}
        </ul>
        {Array.isArray(children) ? children[selectedTab] : children}
      </div>
    </div>
  )
}
