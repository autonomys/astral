import { MobileCard } from 'components/common/MobileCard'
import { INTERNAL_ROUTES } from 'constants/routes'
import { Log } from 'gql/graphql'
import useDomains from 'hooks/useDomains'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  log: Log
}

export const LogListCard: FC<Props> = ({ log }) => {
  const { selectedChain, selectedDomain } = useDomains()
  const body = [
    { name: 'Block', value: log.block.height },
    { name: 'Type', value: log.kind },
    { name: 'Engine', value: '-' },
    { name: 'Data', value: '-' },
  ]
  return (
    <MobileCard
      id='extrinsic-list-extrinsic-mobile'
      header={
        <Link
          className='flex gap-2'
          href={INTERNAL_ROUTES.logs.id.page(selectedChain.urls.page, selectedDomain, log.id)}
        >
          <h3 className='text-sm font-medium text-[#241235] dark:text-white'>{log.id}</h3>
        </Link>
      }
      body={body}
    />
  )
}
