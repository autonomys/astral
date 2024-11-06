import { INTERNAL_ROUTES } from 'constants/routes'
import Link from 'next/link'
import { FC } from 'react'
import { shortString } from 'utils/string'

type Props = {
  isDesktop: boolean
  chain: string
  domain: string
  author?: string
}

export const BlockAuthor: FC<Props> = ({ author, domain, isDesktop, chain }) => {
  return author !== undefined ? (
    <Link className='flex gap-1' href={INTERNAL_ROUTES.accounts.id.page(chain, domain, author)}>
      {isDesktop ? author : shortString(author)}
    </Link>
  ) : (
    <div>Unknown</div>
  )
}
