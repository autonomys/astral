'use client'

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Accordion } from 'components/common/Accordion'
import { List, StyledListItem } from 'components/common/List'
import { StatusIcon } from 'components/common/StatusIcon'
import { Tooltip } from 'components/common/Tooltip'
import {
  INTERNAL_ROUTES,
  ROUTE_EXTRA_FLAG_TYPE,
  ROUTE_FLAG_VALUE_OPEN_CLOSE,
  Routes,
} from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ExtrinsicsSummaryQuery, ExtrinsicsSummaryQueryVariables } from 'gql/oldSquidTypes'
import useChains from 'hooks/useChains'
import { useSquidQuery } from 'hooks/useSquidQuery'
import { useWindowFocus } from 'hooks/useWindowFocus'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FC, useEffect, useMemo } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, isError, isLoading, useQueryStates } from 'states/query'
import { QUERY_EXTRINSIC_SUMMARY } from './query'

interface LastExtrinsicsProps {
  subspaceAccount: string
}

dayjs.extend(relativeTime)

export const LastExtrinsics: FC<LastExtrinsicsProps> = ({ subspaceAccount }) => {
  const { ref, inView } = useInView()
  const { network } = useChains()
  const inFocus = useWindowFocus()
  const { get } = useSearchParams()
  const isSideKickOpen = get(ROUTE_EXTRA_FLAG_TYPE.WALLET_SIDEKICK)

  const variables = useMemo(
    () => ({
      first: 10,
      subspaceAccount,
    }),
    [subspaceAccount],
  )
  const { setIsVisible } = useSquidQuery<ExtrinsicsSummaryQuery, ExtrinsicsSummaryQueryVariables>(
    QUERY_EXTRINSIC_SUMMARY,
    {
      variables,
      skip: !inFocus || isSideKickOpen !== ROUTE_FLAG_VALUE_OPEN_CLOSE.OPEN,
      pollInterval: 6000,
    },
    ROUTE_EXTRA_FLAG_TYPE.WALLET_SIDEKICK,
    'lastExtrinsics',
  )

  const {
    walletSidekick: { lastExtrinsics },
  } = useQueryStates()

  const extrinsics = useMemo(
    () =>
      hasValue(lastExtrinsics) &&
      (lastExtrinsics.value.extrinsics.edges as ExtrinsicsSummaryQuery['extrinsics']['edges']),
    [lastExtrinsics],
  )

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div className='m-2 mt-0 rounded-[20px] bg-grayLight p-5 dark:bg-blueAccent dark:text-white'>
      <Accordion
        title={
          <div className='m-2 mb-0 flex items-center pt-4'>
            <span className='text-base font-medium text-grayDarker dark:text-white'>
              Last extrinsics
            </span>
          </div>
        }
      >
        <div ref={ref}>
          {isLoading(lastExtrinsics) && (
            <ExclamationTriangleIcon className='size-5' stroke='orange' />
          )}
          {isError(lastExtrinsics) && (
            <div className='m-2 flex items-center pt-4'>
              <span className='text-base font-medium text-grayDarker dark:text-white'>
                We are unable to load your wallet data
              </span>
            </div>
          )}
          {extrinsics && extrinsics.length > 0 ? (
            <List>
              {extrinsics.map((extrinsic, index) => (
                <StyledListItem
                  key={index}
                  title={
                    <Link
                      data-testid='extrinsic-link'
                      className='hover:text-primaryAccent'
                      href={INTERNAL_ROUTES.extrinsics.id.page(
                        network,
                        Routes.consensus,
                        extrinsic.node.id,
                      )}
                    >
                      <Tooltip text={dayjs(extrinsic.node.block.timestamp).toString()}>
                        {dayjs(extrinsic.node.block.timestamp).fromNow(true)}
                      </Tooltip>
                    </Link>
                  }
                >
                  <Link
                    key='link-extrinsic'
                    data-testid='extrinsic-link'
                    className='hover:text-primaryAccent'
                    href={INTERNAL_ROUTES.extrinsics.id.page(
                      network,
                      Routes.consensus,
                      extrinsic.node.id,
                    )}
                  >
                    <Tooltip text={extrinsic.node.name.split('.')[1].toUpperCase()}>
                      <span className='text-sm font-medium text-grayDarker dark:text-gray-400'>
                        {extrinsic.node.name.split('.')[1].toUpperCase()}
                      </span>
                    </Tooltip>
                  </Link>
                  <Link
                    key='link-blocks'
                    data-testid='extrinsic-link'
                    className='px-2 hover:text-primaryAccent'
                    href={INTERNAL_ROUTES.blocks.id.page(
                      network,
                      Routes.consensus,
                      extrinsic.node.block.height,
                    )}
                  >
                    <Tooltip text={extrinsic.node.block.id}>
                      <span className='text-sm font-medium text-grayDarker dark:text-gray-400'>
                        #{extrinsic.node.block.height}
                      </span>
                    </Tooltip>
                  </Link>
                  <StatusIcon status={extrinsic.node.success} />
                </StyledListItem>
              ))}
            </List>
          ) : (
            <div className='m-2 flex items-center pt-4'>
              <span className='text-sm font-medium text-grayDarker dark:text-white'></span>
            </div>
          )}
        </div>
      </Accordion>
    </div>
  )
}
