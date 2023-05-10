import { FC } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// gql
import { Extrinsic } from 'gql/graphql'

// common
import { Tab, ExtrinsicCard, PageTabs } from 'common/components'

// account
import { OldAccountExtrinsicList } from 'Account/components'

dayjs.extend(relativeTime)

type Props = {
  extrinsics: Extrinsic[]
  isDesktop?: boolean
}

const OldAccountDetailsTabs: FC<Props> = ({ extrinsics, isDesktop = false }) => {
  return (
    <PageTabs isDesktop={isDesktop}>
      <Tab title={`Extrinsics (${extrinsics.length})`}>
        {isDesktop ? (
          <OldAccountExtrinsicList extrinsics={extrinsics} />
        ) : (
          <div className='flex flex-col'>
            {extrinsics.map((extrinsic) => (
              <ExtrinsicCard
                key={`block-details-extrinsic-card-${extrinsic.id}`}
                extrinsic={extrinsic}
                id='account-details-extrinsic-mobile'
              />
            ))}
          </div>
        )}
      </Tab>
    </PageTabs>
  )
}

export default OldAccountDetailsTabs
