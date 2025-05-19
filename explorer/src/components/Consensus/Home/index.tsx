'use client'

import useMediaQuery from '@/hooks/useMediaQuery'
import { SearchBar } from 'components/common/SearchBar'
import { useHomeQuery } from 'gql/graphql'
import { FC, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { HomeBlockList } from './HomeBlockList'
import { HomeChainInfo } from './HomeChainInfo'
import { HomeChainInfoExtra } from './HomeChainInfoExtra'
import { HomeExtrinsicList } from './HomeExtrinsicList'

// Note: Subscription support is commented out until GraphQL endpoint supports it
// import { gql } from '@apollo/client';
// const HOME_SUBSCRIPTION = gql`
//   subscription HomeSubscription($limit: Int!, $offset: Int!) {
//     consensus_blocks(limit: $limit, offset: $offset, order_by: { sort_id: desc }) {
//       id
//       height
//       timestamp
//       extrinsics_count
//       events_count
//       space_pledged
//       blockchain_size
//       extrinsicsCount: extrinsics_count
//       extrinsics(limit: $limit, offset: $offset, order_by: { sort_id: desc }) {
//         id
//         hash
//         block_height
//         name
//         timestamp
//         success
//       }
//       cumulative {
//         cumulative_extrinsics_count
//         cumulative_events_count
//         cumulative_transfers_count
//         cumulative_transfer_value
//         cumulative_rewards_count
//         cumulative_reward_value
//       }
//     }
//     consensus_accounts_aggregate {
//       aggregate {
//         count
//       }
//     }
//   }
// `

export const Home: FC = () => {
  const { ref, inView } = useInView()
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const PAGE_SIZE = useMemo(() => (isDesktop ? 10 : 3), [isDesktop])

  // Keep traditional query as fallback - we'll keep using this until subscriptions are fully implemented
  const { loading, data } = useHomeQuery({
    variables: { limit: PAGE_SIZE, offset: 0 },
    skip: !inView,
    pollInterval: 6000,
  })

  // Once subscription functionality is implemented, we would use this code:
  // const { data: subscriptionData, loading: subscriptionLoading } = useSubscription(HOME_SUBSCRIPTION, {
  //   variables: { limit: PAGE_SIZE, offset: 0 },
  //   skip: !inView,
  // })
  //
  // const data = subscriptionData || queryData
  // const loading = subscriptionLoading || queryLoading

  return (
    <div className='flex w-full flex-col align-middle'>
      <SearchBar />
      <div ref={ref}>
        <HomeChainInfo data={data} loading={loading} />
        <div className='mb-12 flex w-full flex-col items-center gap-5 xl:flex-row'>
          <HomeBlockList data={data} loading={loading} />
          <HomeExtrinsicList data={data} loading={loading} />
        </div>
        <HomeChainInfoExtra data={data} loading={loading} />
      </div>
    </div>
  )
}
