import { FC } from 'react'
import { Link } from 'react-router-dom'

// gql
import { Log } from 'gql/graphql'

// common
import { MobileCard } from 'common/components'
import { INTERNAL_ROUTES } from 'common/routes'
import useDomains from 'common/hooks/useDomains'

type Props = {
  log: Log
}

const LogListCard: FC<Props> = ({ log }) => {
  const { selectedChain } = useDomains()
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
          to={INTERNAL_ROUTES.logs.id.page(selectedChain.urls.page, log.id)}
        >
          <h3 className='font-medium text-[#241235] text-sm dark:text-white'>{log.id}</h3>
        </Link>
      }
      body={body}
    />
  )
}

export default LogListCard
