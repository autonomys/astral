import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// gql
import { Extrinsic } from 'gql/graphql'

// common
import { MobileCard, Tabs, Tab, ExtrinsicHeader } from 'common/components'

// account
import { AccountExtrinsicList } from 'Account/components'

dayjs.extend(relativeTime)

type Props = {
  extrinsics: Extrinsic[]
  isDesktop?: boolean
}

const AccountDetailsTabs: FC<Props> = ({ extrinsics, isDesktop = false }) => {
  return (
    <Tabs
      tabStyle={
        isDesktop
          ? 'bg-white border border-slate-100 shadow rounded-lg p-4 dark:bg-gradient-to-r dark:from-[#4141B3] dark:via-[#6B5ACF] dark:to-[#896BD2] dark:border-none'
          : ''
      }
      tabTitleStyle={!isDesktop ? 'bg-white rounded-full mb-5 px-5 dark:bg-[#1E254E]' : ''}
      pillStyle={!isDesktop ? 'dark:bg-transparent dark:text-white' : undefined}
      activePillStyle={!isDesktop ? 'dark:bg-[#DE67E4] dark:text-white' : undefined}
    >
      <Tab title='Extrinsics'>
        {isDesktop ? (
          <AccountExtrinsicList extrinsics={extrinsics} />
        ) : (
          <div className='flex flex-col'>
            {extrinsics.map((extrinsic) => (
              <AccountDetailsExtrinsicCard
                key={`block-details-extrinsic-card-${extrinsic.id}`}
                extrinsic={extrinsic}
              />
            ))}
          </div>
        )}
      </Tab>
    </Tabs>
  )
}

export default AccountDetailsTabs

type ExtrinsicCardProps = {
  extrinsic: Extrinsic
}

const AccountDetailsExtrinsicCard: FC<ExtrinsicCardProps> = ({ extrinsic }) => {
  const blockDate = dayjs(extrinsic.block.timestamp).fromNow(true)

  const body = [
    { name: 'Block', value: extrinsic.block.height },
    { name: 'Call', value: extrinsic.name.split('.')[1].toUpperCase() },
    { name: 'Time', value: `${blockDate} ago` },
  ]
  return (
    <MobileCard
      id='account-details-extrinsic-mobile'
      header={<ExtrinsicHeader extrinsic={extrinsic} />}
      body={body}
    />
  )
}
