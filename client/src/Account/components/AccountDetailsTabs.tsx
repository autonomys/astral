import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// gql
import { Extrinsic } from 'gql/graphql'

// common
import { MobileCard, StatusIcon, Tabs, Tab } from 'common/components'

// account
import { AccountExtrinsicList } from 'Account/components'

dayjs.extend(relativeTime)

type Props = {
  extrinsics: Extrinsic[]
  isDesktop?: boolean
}

const AccountDetailsTabs: FC<Props> = ({ extrinsics, isDesktop = false }) => {
  return (
    <Tabs>
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
      header={
        <>
          <StatusIcon status={extrinsic.success} />
          <h3 className='font-medium text-[#241235] text-sm'>{`${extrinsic.pos}.${extrinsic.block.height}`}</h3>
        </>
      }
      body={body}
    />
  )
}
