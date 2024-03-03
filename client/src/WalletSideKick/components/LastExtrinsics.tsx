import { useQuery } from '@apollo/client'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import dayjs from 'dayjs'
import { ExtrinsicsConnection } from 'gql/graphql'
import { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'

// common
import { Accordion, List, StatusIcon, StyledListItem, Tooltip } from 'common/components'
import type { Chain } from 'common/providers/ChainProvider'
import { INTERNAL_ROUTES } from 'common/routes'

// layout
import { DOMAINS_NAMES } from 'layout/constants'

// query
import { QUERY_EXTRINSIC_SUMMARY } from '../querys'

interface LastExtrinsicsProps {
  subspaceAccount: string
  selectedChain: Chain
}

export const LastExtrinsics: FC<LastExtrinsicsProps> = ({ subspaceAccount, selectedChain }) => {
  const summaryVariables = useMemo(
    () => ({
      first: 10,
      subspaceAccount,
    }),
    [subspaceAccount],
  )
  const { data, error, loading } = useQuery(QUERY_EXTRINSIC_SUMMARY, {
    variables: summaryVariables,
    pollInterval: 6000,
  })
  const lastExtrinsics: ExtrinsicsConnection['edges'] = useMemo(
    () => (data && data.extrinsics && data.extrinsics.edges ? data.extrinsics.edges : []),
    [data],
  )

  return (
    <div className='p-5 m-2 mt-0 bg-[#DDEFF1] rounded-[20px] dark:bg-[#1E254E] dark:text-white'>
      <Accordion
        title={
          <div className='flex items-center m-2 mb-0 pt-4'>
            <span className='text-[#241235] text-base font-medium dark:text-white'>
              Last extrinsics
            </span>
          </div>
        }
      >
        {loading && <ExclamationTriangleIcon className='h-5 w-5' stroke='orange' />}
        {error && (
          <div className='flex items-center m-2 pt-4'>
            <span className='text-[#241235] text-base font-medium dark:text-white'>
              We are unable to load your wallet data
            </span>
          </div>
        )}
        {lastExtrinsics && lastExtrinsics.length > 0 ? (
          <List>
            {lastExtrinsics.map((extrinsic, index) => (
              <li key={index}>
                <StyledListItem
                  title={
                    <Link
                      data-testid='extrinsic-link'
                      className='hover:text-[#DE67E4]'
                      to={INTERNAL_ROUTES.extrinsics.id.page(
                        selectedChain.urls.page,
                        DOMAINS_NAMES.consensus,
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
                    className='hover:text-[#DE67E4]'
                    to={INTERNAL_ROUTES.extrinsics.id.page(
                      selectedChain.urls.page,
                      DOMAINS_NAMES.consensus,
                      extrinsic.node.id,
                    )}
                  >
                    <Tooltip text={extrinsic.node.name.split('.')[1].toUpperCase()}>
                      <span className='text-[#241235] text-sm font-medium dark:text-gray-400'>
                        {extrinsic.node.name.split('.')[1].toUpperCase()}
                      </span>
                    </Tooltip>
                  </Link>
                  <Link
                    data-testid='extrinsic-link'
                    className='hover:text-[#DE67E4] px-2'
                    to={INTERNAL_ROUTES.blocks.id.page(
                      selectedChain.urls.page,
                      DOMAINS_NAMES.consensus,
                      extrinsic.node.block.height,
                    )}
                  >
                    <Tooltip text={extrinsic.node.block.id}>
                      <span className='text-[#241235] text-sm font-medium dark:text-gray-400'>
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
          <div className='flex items-center m-2 pt-4'>
            <span className='text-[#241235] text-sm font-medium dark:text-white'>
              {!loading && !error && 'You have no extrinsics yet'}
            </span>
          </div>
        )}
      </Accordion>
    </div>
  )
}
