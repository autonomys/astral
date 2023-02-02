import { FC, ReactElement } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// common
import { Tabs } from 'common/components'

dayjs.extend(relativeTime)

type Props = {
  children: ReactElement[] | ReactElement
  isDesktop?: boolean
}

const PageTabs: FC<Props> = ({ children, isDesktop = false }) => {
  return (
    <Tabs
      tabStyle={
        isDesktop
          ? 'bg-white border border-slate-100 shadow rounded-lg p-4 dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'
          : ''
      }
      tabTitleStyle={!isDesktop ? 'bg-white rounded-full mb-5 px-5 dark:bg-[#1E254E]' : ''}
      pillStyle={!isDesktop ? 'dark:bg-transparent dark:text-white' : ''}
      activePillStyle={!isDesktop ? 'dark:bg-[#DE67E4] dark:text-white' : ''}
    >
      {children}
    </Tabs>
  )
}

export default PageTabs
