import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { FC, ReactElement } from 'react'

// common
import { Tabs } from './Tabs'

dayjs.extend(relativeTime)

type Props = {
  children: ReactElement[] | ReactElement
  isDesktop?: boolean
}

export const PageTabs: FC<Props> = ({ children, isDesktop = false }) => {
  return (
    <Tabs
      tabStyle={
        isDesktop
          ? 'bg-white border border-slate-100 shadow rounded-lg p-4 dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'
          : ''
      }
      tabTitleStyle={!isDesktop ? 'bg-white rounded-full mb-5 px-5 dark:bg-[#1E254E]' : ''}
      pillStyle={`dark:text-white ${isDesktop && 'dark:bg-transparent'}`}
      activePillStyle={`dark:text-white text-white bg-[#241235] ${
        isDesktop ? 'dark:bg-[#1E254E]' : 'dark:bg-[#DE67E4]'
      }`}
    >
      {children}
    </Tabs>
  )
}
