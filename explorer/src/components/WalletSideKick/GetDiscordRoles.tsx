import { Accordion } from 'components/common/Accordion'
import { List, StyledListItem } from 'components/common/List'
import { Modal } from 'components/common/Modal'
import { EXTERNAL_ROUTES } from 'constants/routes'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { FC, useMemo, useState } from 'react'
import { ConnectDiscord } from './Actions/ConnectDiscord'
import { JoinDiscord } from './Actions/JoinDiscord'
import { VerifyWalletOwnership } from './Actions/VerifyWalletOwnership'

type ExplainerProps = {
  isOpen: boolean
  onClose: () => void
}

const Explainer: FC<ExplainerProps> = ({ isOpen, onClose }) => {
  return (
    <Modal title={'Explainer'} onClose={onClose} isOpen={isOpen}>
      <div className='flex flex-col items-start gap-4'>
        <div className='flex flex-col items-center gap-4'>
          <div className='grid grid-cols-1 gap-4'>
            <Accordion title='How to become a farmer?'>
              <Link href={EXTERNAL_ROUTES.docs + 'category/farming/'} target='_blank'>
                Please refer to the farming documentation on the Subspace website.
              </Link>
            </Accordion>
            <Accordion title='Why am I not getting the verified farmer role?'>
              The address you are using to sign the message needs to have won a block or a vote
              while farming.
            </Accordion>
          </div>
        </div>
        <button
          className='flex w-full max-w-fit items-center gap-2 rounded-lg bg-grayDarker px-2 text-sm font-medium text-white dark:bg-blueAccent md:space-x-4 md:text-base'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}

const ExplainerLinkAndModal: FC = () => {
  const [explainerOpen, setExplainerOpen] = useState(false)
  return (
    <>
      <button
        className='text-xs text-gray-500 underline'
        onClick={() => setExplainerOpen(true)}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        Having trouble? Check the explainer.
      </button>
      <Explainer isOpen={explainerOpen} onClose={() => setExplainerOpen(false)} />
    </>
  )
}

export const GetDiscordRoles: FC = () => {
  const { data: session } = useSession()

  const hasAnyRoles = useMemo(
    () =>
      session?.user?.discord?.vcs &&
      Object.values(session.user.discord.vcs).some((role) => role === true),
    [session],
  )

  if (hasAnyRoles)
    return (
      <div className='m-2 mt-0 rounded-lg bg-grayLight p-5 dark:bg-blueAccent dark:text-white'>
        <Accordion title='Your verified roles on Discord'>
          <List>
            {session?.user?.discord?.vcs.roles.mainnetFarmer && (
              <StyledListItem title='You are a Verified Mainnet Farmer on Discord'>
                🌾
              </StyledListItem>
            )}
            {session?.user?.discord?.vcs.roles.mainnetOperator && (
              <StyledListItem title='You are a Verified Mainnet Operator on Discord'>
                🌐
              </StyledListItem>
            )}
            {session?.user?.discord?.vcs.roles.mainnetNominator && (
              <StyledListItem title='You are a Verified Mainnet Nominator on Discord'>
                🤝
              </StyledListItem>
            )}
            {session?.user?.discord?.vcs.roles.taurusFarmer && (
              <StyledListItem title='You are a Verified Taurus Farmer on Discord'>
                🌾
              </StyledListItem>
            )}
            {session?.user?.discord?.vcs.roles.taurusOperator && (
              <StyledListItem title='You are a Verified Taurus Operator on Discord'>
                🌐
              </StyledListItem>
            )}
            {session?.user?.discord?.vcs.roles.taurusNominator && (
              <StyledListItem title='You are a Verified Taurus Nominator on Discord'>
                🤝
              </StyledListItem>
            )}
            {session?.user?.discord?.vcs.roles.mainnetTalismanFarmer && (
              <StyledListItem title='You are a Verified Talisman Farmer on Discord'>
                🌾
              </StyledListItem>
            )}
            <VerifyWalletOwnership />
            <ConnectDiscord />
          </List>
        </Accordion>
        <ExplainerLinkAndModal />
      </div>
    )

  return (
    <div className='m-2 mt-0 rounded-lg bg-grayLight p-5 dark:bg-blueAccent dark:text-white'>
      <Accordion title='Get verified roles on Discord'>
        <List>
          <VerifyWalletOwnership />
          <JoinDiscord />
          <ConnectDiscord />
        </List>
      </Accordion>
      <ExplainerLinkAndModal />
    </div>
  )
}
