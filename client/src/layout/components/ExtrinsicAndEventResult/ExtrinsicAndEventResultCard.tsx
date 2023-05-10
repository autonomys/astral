import { FC } from 'react'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

// layout
import { Result } from 'layout/components/ExtrinsicAndEventResult'

// common
import { MobileCard } from 'common/components'
import useDomains from 'common/hooks/useDomains'
import { INTERNAL_ROUTES } from 'common/routes'

dayjs.extend(relativeTime)

interface Props {
  result: Result
}

const ExtrinsicAndEventResultCard: FC<Props> = ({ result }) => {
  const { selectedChain } = useDomains()
  const blockDate = dayjs(result.timestamp).fromNow(true)

  const body = [
    { name: 'Block', value: result.blockHeight },
    { name: 'Type', value: result.type },
    { name: 'Action', value: result.action.split('.')[1].toUpperCase() },
    { name: 'Time', value: `${blockDate} ago` },
  ]

  const link =
    result.type === 'Extrinsic'
      ? INTERNAL_ROUTES.extrinsics.id.page(selectedChain.urls.page, result.id)
      : INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, result.id)

  return (
    <MobileCard
      id='extrinsic-list-extrinsic-mobile'
      header={
        <Link className='flex gap-2' to={link}>
          <h3 className='font-medium text-[#241235] text-sm dark:text-white'>{result.id}</h3>
        </Link>
      }
      body={body}
    />
  )
}

export default ExtrinsicAndEventResultCard
