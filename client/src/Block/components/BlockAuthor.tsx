import { FC } from 'react'
import { Link } from 'react-router-dom'

// common
import { shortString } from 'common/helpers'
import { INTERNAL_ROUTES } from 'common/routes'

type Props = {
  isDesktop: boolean
  chain: string
  domain: string
  author?: string
}

const BlockAuthor: FC<Props> = ({ author, domain, isDesktop, chain }) => {
  return author !== undefined ? (
    <Link className='flex gap-1' to={INTERNAL_ROUTES.accounts.id.page(chain, domain, author)}>
      {isDesktop ? author : shortString(author)}
    </Link>
  ) : (
    <div>Unknown</div>
  )
}

export default BlockAuthor
