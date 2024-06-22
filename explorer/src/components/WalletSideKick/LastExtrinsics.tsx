'use client'

import { useQuery } from '@apollo/client'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Accordion } from 'components/common/Accordion'
import { List, StyledListItem } from 'components/common/List'
import { StatusIcon } from 'components/common/StatusIcon'
import { Tooltip } from 'components/common/Tooltip'
import type { Chain } from 'constants/chains'
import { INTERNAL_ROUTES, Routes } from 'constants/routes'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { ExtrinsicsSummaryQuery } from 'gql/graphql'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import { QUERY_EXTRINSIC_SUMMARY } from './query'

interface LastExtrinsicsProps {
  subspaceAccount: string
  selectedChain: Chain
}

export const LastExtrinsics: FC<LastExtrinsicsProps> = ({ subspaceAccount, selectedChain }) => {
  dayjs.extend(relativeTime)
  const summaryVariables = useMemo(
    () => ({
      first: 10,
      subspaceAccount,
    }),
    [subspaceAccount],
  )
  const { data, error, loading } = useQuery<ExtrinsicsSummaryQuery>(QUERY_EXTRINSIC_SUMMARY, {
    variables: summaryVariables,
    pollInterval: 6000,
  })
  const extrinsics = useMemo(() => data && data.extrinsics.edges, [data])

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
        {loading && <ExclamationTriangleIcon className='size-5' stroke='orange' />}
        {error && (
          <div className='m-2 flex items-center pt-4'>
            <span className='text-base font-medium text-grayDarker dark:text-white'>
              We are unable to load your wallet data
            </span>
          </div>
        )}
        {extrinsics && extrinsics.length > 0 ? (
          <List>
            {extrinsics.map((extrinsic, index) => (
              <li key={index}>
                <StyledListItem
                  title={
                    <Link
                      data-testid='extrinsic-link'
                      className='hover:text-purpleAccent'
                      href={INTERNAL_ROUTES.extrinsics.id.page(
                        selectedChain.urls.page,
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
                    data-testid='extrinsic-link'
                    className='hover:text-purpleAccent'
                    href={INTERNAL_ROUTES.extrinsics.id.page(
                      selectedChain.urls.page,
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
                    data-testid='extrinsic-link'
                    className='px-2 hover:text-purpleAccent'
                    href={INTERNAL_ROUTES.blocks.id.page(
                      selectedChain.urls.page,
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
              </li>
            ))}
          </List>
        ) : (
          <div className='m-2 flex items-center pt-4'>
            <span className='text-sm font-medium text-grayDarker dark:text-white'>
              {!loading && !error && 'You have no extrinsics yet'}
            </span>
          </div>
        )}
      </Accordion>
    </div>
  )
}
