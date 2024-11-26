import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline'
import { List, StyledListItem } from 'components/common/List'
import { StyledButton } from 'components/common/StyledButton'
import { QUERY_EXTRINSIC_BY_HASH } from 'components/Consensus/Extrinsic/query'
import { ROUTE_API, ROUTE_EXTRA_FLAG_TYPE } from 'constants/routes'
import { ExtrinsicsByHashQuery, ExtrinsicsByHashQueryVariables } from 'gql/graphql'
import useIndexers from 'hooks/useIndexers'
import { useSquidQuery } from 'hooks/useSquidQuery'
import useWallet from 'hooks/useWallet'
import { useWindowFocus } from 'hooks/useWindowFocus'
import { FC, useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { hasValue, useQueryStates } from 'states/query'

export const ClaimStakingToken: FC = () => {
  const { inView, ref } = useInView()
  const { actingAccount, subspaceAccount, injector } = useWallet()
  const { network, tokenSymbol } = useIndexers()

  const [claimIsPending, setClaimIsPending] = useState(false)
  const [claimIsFinalized, setClaimIsFinalized] = useState(false)
  const [claimError, setClaimError] = useState<string | null>(null)
  const [claimHash, setClaimHash] = useState<string | null>(null)
  const inFocus = useWindowFocus()

  const { setIsVisible } = useSquidQuery<ExtrinsicsByHashQuery, ExtrinsicsByHashQueryVariables>(
    QUERY_EXTRINSIC_BY_HASH,
    {
      variables: { hash: claimHash ?? '' },
      skip: !inFocus || claimHash === null || claimIsFinalized,
      pollInterval: 6000,
    },
    ROUTE_EXTRA_FLAG_TYPE.WALLET_SIDEKICK,
    'claim',
  )

  const {
    walletSidekick: { claim },
  } = useQueryStates()

  const handleClaimOperatorDisbursement = useCallback(async () => {
    setClaimError(null)
    if (!actingAccount || !injector) throw new Error('No wallet connected')
    if (!injector.signer.signRaw) throw new Error('No signer')
    if (!subspaceAccount) throw new Error('No subspace account')

    // Prepare and sign the message
    const message = `I am the owner of ${subspaceAccount} and I claim the operator disbursement`
    const signature = await injector.signer.signRaw({
      address: actingAccount.address,
      type: 'bytes',
      data: message,
    })
    if (!signature) throw new Error('No signature')
    const claim = await fetch(ROUTE_API.claim.operatorDisbursement(network), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        address: actingAccount.address,
        message,
        signature: signature.signature,
      }),
    }).then((res) => res.json())
    if (claim.hash) {
      setClaimIsPending(true)
      setClaimHash(claim.hash)
    } else if (claim.error) setClaimError(claim.error)
  }, [actingAccount, injector, network, subspaceAccount])

  useEffect(() => {
    if (
      hasValue(claim) &&
      claim.value.consensus_extrinsics &&
      claim.value.consensus_extrinsics.length > 0
    )
      setClaimIsFinalized(true)
  }, [claim])

  useEffect(() => {
    setIsVisible(inView)
  }, [inView, setIsVisible])

  return (
    <div ref={ref}>
      <List>
        <StyledListItem
          title={
            <>
              <p>
                <b>Run an operator node</b> in Stake Wars 2,
              </p>
              <p>
                {' '}
                claim <b>100 {tokenSymbol}</b> to cover the operator stake.
              </p>
            </>
          }
        >
          {claimIsFinalized ? (
            <>
              <p className='text-sm text-gray-500'>
                Claimed <CheckCircleIcon className='size-5' stroke='green' />
              </p>
            </>
          ) : (
            <>
              {claimIsPending ? (
                <p className='text-sm text-gray-500'>
                  Pending <ClockIcon className='size-5' stroke='orange' />
                </p>
              ) : (
                <StyledButton
                  className={`ml-2 ${claimError !== null && 'cursor-not-allowed'}`}
                  isDisabled={claimError !== null}
                  onClick={handleClaimOperatorDisbursement}
                >
                  Claim
                </StyledButton>
              )}
            </>
          )}
        </StyledListItem>
        {claimError && <p className='text-sm text-red-500'>{claimError}</p>}
      </List>
    </div>
  )
}
