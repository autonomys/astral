import { FC } from 'react'
import { Link } from 'react-router-dom'
import { INTERNAL_ROUTES } from 'common/routes'

// gql
import { Scalars } from 'gql/graphql'

type Props = {
  height: Scalars['BigInt']
  chain: string
}

const HeaderBlockLink: FC<Props> = ({ height, chain }) => (
  <Link className='flex gap-1' to={INTERNAL_ROUTES.blocks.id.page(chain, height)}>
    <h3 className='font-medium text-[#241235] text-sm dark:text-white'>#{height}</h3>
  </Link>
)

export default HeaderBlockLink
