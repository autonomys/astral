import { StyledListItem } from 'components/common/List'
import { StyledButton } from 'components/common/StyledButton'
import { CheckMarkIcon } from 'components/icons/CheckMarkIcon'
import useWallet from 'hooks/useWallet'
import { signIn, useSession } from 'next-auth/react'
import { FC, useCallback } from 'react'
import toast from 'react-hot-toast'

export const VerifyWalletOwnership: FC = () => {
  const { data: session } = useSession()
  const { actingAccount, subspaceAccount, injector } = useWallet()

  const handleWalletOwnership = useCallback(async () => {
    try {
      if (!actingAccount || !injector) throw new Error('No wallet connected')
      if (!injector.signer.signRaw) throw new Error('No signer')
      if (!subspaceAccount) throw new Error('No subspace account')

      // Prepare and sign the message
      const message = `I am the owner of ${subspaceAccount}`
      const signature = await injector.signer.signRaw({
        address: actingAccount.address,
        type: 'bytes',
        data: message,
      })
      if (!signature) throw new Error('No signature')

      // Sign-in using the message&signature
      await signIn('subspace', {
        redirect: false,
        account: subspaceAccount,
        message,
        signature: signature.signature,
        walletSource: actingAccount.source,
        walletType: actingAccount.type,
      })
      toast.success('You verified the ownership of your wallet!', { position: 'bottom-center' })
    } catch (error) {
      const reason = 'There was an error while signing the message'
      toast.error(reason, { position: 'bottom-center' })
      console.error('Error', error)
    }
  }, [actingAccount, injector, subspaceAccount])

  return (
    <StyledListItem title='Verify the ownership of your wallet'>
      {session?.user?.subspace?.account ? (
        <>
          <CheckMarkIcon />
          <StyledButton className='ml-2' onClick={handleWalletOwnership}>
            Refresh
          </StyledButton>
        </>
      ) : (
        <StyledButton onClick={handleWalletOwnership}>Sign</StyledButton>
      )}
    </StyledListItem>
  )
}
