import { useQuery } from '@apollo/client'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import dayjs from 'dayjs'
import { ExtrinsicsConnection } from 'gql/graphql'
import { FC, useMemo } from 'react'
import { Link } from 'react-router-dom'

// common
import { Accordion, List, StatusIcon, StyledListItem } from 'common/components'
import useDomains from 'common/hooks/useDomains'
import { INTERNAL_ROUTES } from 'common/routes'

// query
import { QUERY_EXTRINSIC_SUMMARY } from '../querys'

interface LastExtrinsicsProps {
  subspaceAccount: string
}

export const LastExtrinsics: FC<LastExtrinsicsProps> = ({ subspaceAccount }) => {
  const { selectedChain } = useDomains()

  const summaryVariables = useMemo(
    () => ({
      first: 10,
      subspaceAccount,
    }),
    [subspaceAccount],
  )

  const {
    data: lastExtrinsicsData,
    error: lastExtrinsicsError,
    loading: lastExtrinsicsLoading,
  } = useQuery(QUERY_EXTRINSIC_SUMMARY, {
    variables: summaryVariables,
    pollInterval: 6000,
  })

  const lastExtrinsics: ExtrinsicsConnection['edges'] = useMemo(
    () =>
      lastExtrinsicsData && lastExtrinsicsData.extrinsics && lastExtrinsicsData.extrinsics.edges
        ? lastExtrinsicsData.extrinsics.edges
        : [],
    [lastExtrinsicsData],
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
        {lastExtrinsicsLoading && <ExclamationTriangleIcon className='h-5 w-5' stroke='orange' />}
        {lastExtrinsicsError && (
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
                <Link
                  data-testid='extrinsic-link'
                  className='hover:text-[#DE67E4]'
                  to={INTERNAL_ROUTES.extrinsics.id.page(
                    selectedChain.urls.page,
                    'consensus',
                    extrinsic.node.id,
                  )}
                >
                  <StyledListItem title={dayjs(extrinsic.node.block.timestamp).fromNow(true)}>
                    {extrinsic.node.name.split('.')[1].toUpperCase()}
                    <StatusIcon status={extrinsic.node.success} />
                  </StyledListItem>
                </Link>
              </li>
            ))}
          </List>
        ) : (
          <div className='flex items-center m-2 pt-4'>
            <span className='text-[#241235] text-sm font-medium dark:text-white'>
              {!lastExtrinsicsLoading && !lastExtrinsicsError && 'You have no extrinsics yet'}
            </span>
          </div>
        )}
      </Accordion>
    </div>
  )
}
