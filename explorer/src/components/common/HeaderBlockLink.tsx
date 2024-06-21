import { INTERNAL_ROUTES } from 'constants/routes'
import Link from 'next/link'
import { FC } from 'react'

// gql
import { Scalars } from 'gql/graphql'

type Props = {
  height: Scalars['BigInt']
  chain: string
  domain: string
}

export const HeaderBlockLink: FC<Props> = ({ height, domain, chain }) => (
  <Link className='flex gap-1' href={INTERNAL_ROUTES.blocks.id.page(chain, domain, Number(height))}>
    <h3 className='text-sm font-medium text-grayDarker dark:text-white'>#{Number(height)}</h3>
  </Link>
)
