import React, { FC, ReactElement, useState } from 'react'

// common
import { TabTitle } from 'common/components/Tabs'

type Props = {
  children: ReactElement[]
  isDesktop?: boolean
}

const AccountRewardsTabs: FC<Props> = ({ children, isDesktop = false }) => {
  const [selectedTab, setSelectedTab] = useState(0)

  const tabStyle = isDesktop
    ? 'bg-white border border-slate-100 shadow rounded-[20px] p-4 dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'
    : ''

  const tabTitleStyle = !isDesktop
    ? 'bg-white rounded-full mb-5 px-5 dark:bg-[#1E254E] dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] justify-center items-center'
    : ''

  const activePillStyle = 'dark:text-white text-white bg-[#241235] dark:bg-[#1E254E]'

  return (
    <div className={`flex flex-wrap w-full ${tabStyle}`}>
      <div className='w-full'>
        <div className='w-full flex flex-col lg:flex-row md:justify-between md:items-center'>
          <div className='hidden lg:flex gap-4 items-baseline'>
          </div>

          <div className='w-full lg:w-auto'>
            <ul
              className={`grid grid-cols-2 justify-items-center lg:flex w-full list-none flex-wrap pt-3 pb-4 flex-row ${tabTitleStyle}`}
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

        {children[selectedTab]}
      </div>
    </div>
  )
}

export default AccountRewardsTabs
