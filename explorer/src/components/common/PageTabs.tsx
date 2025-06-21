import { cn } from '@/utils/cn'
import { FC, ReactElement } from 'react'
import { Tabs } from './Tabs'

type Props = {
  children: ReactElement[] | ReactElement
  isDesktop?: boolean
  pillStyle?: string
  activePillStyle?: string
  tabStyle?: string
  tabTitleStyle?: string
}

export const PageTabs: FC<Props> = ({
  children,
  isDesktop = false,
  pillStyle,
  activePillStyle,
  tabStyle,
  tabTitleStyle,
}) => {
  return (
    <Tabs
      tabStyle={cn(isDesktop ? 'bg-transparent rounded-lg p-4 dark:border-none' : '', tabStyle)}
      tabTitleStyle={cn(
        !isDesktop ? 'bg-transparent rounded-lg mb-5 px-5 dark:bg-boxDark' : '',
        tabTitleStyle,
      )}
      pillStyle={cn('dark:text-white', isDesktop && 'dark:bg-transparent', pillStyle)}
      activePillStyle={cn(
        'dark:text-white text-white bg-buttonLightFrom',
        isDesktop ? 'dark:bg-buttonDarkFrom' : 'dark:bg-buttonDarkFrom',
        activePillStyle,
      )}
    >
      {children}
    </Tabs>
  )
}
