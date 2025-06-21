import { TabContent, TabTitle } from 'components/common/Tabs'
import React, { FC, ReactElement, useState } from 'react'

type Props = {
  children: ReactElement[]
  isDesktop?: boolean
}

export const AccountRewardsTabs: FC<Props> = ({ children, isDesktop = false }) => {
  const [selectedTab, setSelectedTab] = useState<number | string>(0)

  const tabStyle = isDesktop
    ? 'bg-white border border-slate-100 shadow rounded-lg p-4 dark:bg-boxDark dark:border-none'
    : ''

  const tabTitleStyle = !isDesktop
    ? 'bg-white rounded-lg mb-5 px-5 dark:bg-blueAccent dark:bg-gradient-to-r dark:from-gradientFrom dark:via-gradientVia dark:to-gradientTo justify-center items-center'
    : ''

  const activePillStyle = 'dark:text-white text-white bg-buttonLightFrom dark:bg-buttonDarkFrom'

  return (
    <div className={`flex w-full flex-wrap ${tabStyle}`}>
      <div className='w-full'>
        <div className='flex w-full flex-col md:items-center md:justify-between lg:flex-row'>
          <div className='hidden items-baseline gap-4 lg:flex'></div>

          <div className='w-full lg:w-auto'>
            <ul
              className={`grid w-full list-none grid-cols-2 flex-row flex-wrap justify-items-center pb-4 pt-3 lg:flex ${tabTitleStyle}`}
              role='tablist'
            >
              {children.map((item, index) => (
                <TabTitle
                  key={index}
                  title={item.props.title}
                  onClick={item.props.onClick}
                  index={index}
                  isSelected={selectedTab === index}
                  setSelectedTab={setSelectedTab}
                  pillStyle='text-gray-600 bg-white dark:bg-transparent dark:text-white '
                  activePillStyle={activePillStyle}
                />
              ))}
            </ul>
          </div>
        </div>

        <TabContent selectedTab={selectedTab}>{children}</TabContent>
      </div>
    </div>
  )
}
