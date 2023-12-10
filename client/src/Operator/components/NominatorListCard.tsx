import { FC } from 'react'
import { Link } from 'react-router-dom'
import Identicon from '@polkadot/react-identicon'
import { Nominator } from 'gql/graphql'

// common
import { MobileCard } from 'common/components'
import useDomains from 'common/hooks/useDomains'
import { numberWithCommas, shortString } from 'common/helpers'
import { INTERNAL_ROUTES } from 'common/routes'

type Props = {
  nominator: Nominator
}

const NominatorListCard: FC<Props> = ({ nominator }) => {
  const { selectedChain, selectedDomain } = useDomains()

  const body = [
    { name: 'Id', value: nominator.account.id ? shortString(nominator.account.id) : 'Unknown' },
    { name: 'Shares', value: nominator.shares ? numberWithCommas(nominator.shares) : 0 },
  ]
  return (
    <MobileCard
      id='nominator-list-mobile'
      header={
        <div
          key={`${nominator.account.id}-account-id`}
          className='flex row items-center gap-3 -mt-3 -mx-1'
        >
          <Identicon value={nominator.account.id} size={49} theme='beachball' />
          <Link
            to={INTERNAL_ROUTES.accounts.id.page(
              selectedChain.urls.page,
              selectedDomain,
              nominator.account.id,
            )}
          >
            <p className='font-medium text-[#241235] text-sm break-all dark:text-white'>
              {nominator.account.id}
            </p>
          </Link>
        </div>
      }
      body={body}
    />
  )
}

export default NominatorListCard
