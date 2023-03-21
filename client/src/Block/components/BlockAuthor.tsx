import { FC } from 'react'
import { Link } from 'react-router-dom'

// common
import { shortString } from 'common/helpers'
import { INTERNAL_ROUTES } from 'common/routes'

type Props = {
  isDesktop: boolean
  chain: string
  author?: string
}

const BlockAuthor: FC<Props> = ({ author, isDesktop, chain }) => {
  const hasBlockAuthor = author !== undefined && author !== null
  const blockAuthor = author || 'Unknown'

  return hasBlockAuthor ? (
    isDesktop ? (
      <Link className='flex gap-1' to={INTERNAL_ROUTES.accounts.id.page(chain, blockAuthor)}>
        {blockAuthor}
      </Link>
    ) : (
      <Link className='flex gap-1' to={INTERNAL_ROUTES.accounts.id.page(chain, blockAuthor)}>
        {shortString(blockAuthor)}
      </Link>
    )
  ) : (
    <div>Unknown</div>
  )
}

export default BlockAuthor
