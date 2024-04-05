import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Link from 'next/link'
import { FC } from 'react'

// layout
import { Result } from '@/components/layout/ExtrinsicAndEventResult'

// common
import { MobileCard } from 'components/common/MobileCard'
import { INTERNAL_ROUTES } from 'constants/routes'
import useDomains from 'hooks/useDomains'

dayjs.extend(relativeTime)

interface Props {
  result: Result
}

export const ExtrinsicAndEventResultCard: FC<Props> = ({ result }) => {
  const { selectedChain, selectedDomain } = useDomains()
  const blockDate = dayjs(result.timestamp).fromNow(true)

  const body = [
    { name: 'Block', value: result.blockHeight },
    { name: 'Type', value: result.type },
    { name: 'Action', value: result.action.split('.')[1].toUpperCase() },
    { name: 'Time', value: `${blockDate} ago` },
  ]

  const link =
    result.type === 'Extrinsic'
      ? INTERNAL_ROUTES.extrinsics.id.page(selectedChain.urls.page, selectedDomain, result.id)
      : INTERNAL_ROUTES.events.id.page(selectedChain.urls.page, selectedDomain, result.id)

  return (
    <MobileCard
      id='extrinsic-list-extrinsic-mobile'
      header={
        <Link className='flex gap-2' href={link}>
          <h3 className='text-sm font-medium text-[#241235] dark:text-white'>{result.id}</h3>
        </Link>
      }
      body={body}
    />
  )
}
