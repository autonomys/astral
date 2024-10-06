import { balance, transfer } from '@autonomys/auto-consensus'
import {
  activateWallet,
  ActivateWalletParams,
  ApiPromise,
  decode,
  signatureVerify,
  stringToU8a,
} from '@autonomys/auto-utils'
import { indexers } from 'constants/indexers'
import { CLAIM_TYPES } from 'constants/routes'
import { AuthProvider } from 'constants/session'
import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from 'utils/auth/verifyToken'
import {
  findClaim,
  findClaimStats,
  findUserByID,
  saveClaim,
  saveClaimStats,
  updateClaimStats,
  updateUser,
} from 'utils/fauna'
import { formatUnitsToNumber } from 'utils/number'
import { sendSlackStatsMessage, walletBalanceLowSlackMessage } from 'utils/slack'

export const POST = async (req: NextRequest) => {
  try {
    if (!process.env.WALLET_CLAIM_OPERATOR_DISBURSEMENT_URI)
      throw new Error('Missing WALLET_CLAIM_OPERATOR_DISBURSEMENT_URI')
    if (
      !process.env.CLAIM_OPERATOR_DISBURSEMENT_AMOUNT &&
      process.env.CLAIM_OPERATOR_DISBURSEMENT_AMOUNT !== '0'
    )
      throw new Error('Missing CLAIM_OPERATOR_DISBURSEMENT_AMOUNT')

    const session = verifyToken()
    console.log('session', session)

    const dbSession = await findUserByID(session.id)
    console.log('dbSession', dbSession)

    if (!dbSession) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const pathname = req.nextUrl.pathname
    const chain = pathname.split('/').slice(3)[0]
    const claimType = pathname.split('/').slice(4)[0]
    if (claimType !== CLAIM_TYPES.OperatorDisbursement)
      return NextResponse.json({ error: 'Invalid claim type' }, { status: 400 })

    const chainMatch = indexers.find((c) => c.network === chain)
    if (!chainMatch) return NextResponse.json({ error: 'Invalid chain' }, { status: 400 })

    const previousClaim = await findClaim(session.id, chainMatch.network, claimType)
    if (previousClaim) return NextResponse.json({ error: 'Already claimed' }, { status: 400 })

    const claim = await req.json()
    const { message, signature, address } = claim

    // Verify the signature
    const publicKey = decode(address)
    const isValid = signatureVerify(stringToU8a(message), signature, publicKey).isValid
    if (!isValid) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })

    const claimStats = await findClaimStats(chainMatch.network, claimType)

    const {
      api,
      accounts: [wallet],
    } = await activateWallet({
      uri: process.env.WALLET_CLAIM_OPERATOR_DISBURSEMENT_URI,
      networkId: chainMatch.network,
    } as ActivateWalletParams)

    // Get wallet free balance
    const { free } = await balance(api as unknown as ApiPromise, wallet.address)
    if (BigInt(free) < BigInt(process.env.CLAIM_WALLET_LOW_FUND_WARNING || 1000 * 10 ** 18))
      await walletBalanceLowSlackMessage(
        formatUnitsToNumber(free.toString()).toString(),
        wallet.address,
      )

    if (BigInt(free) <= BigInt(process.env.CLAIM_OPERATOR_DISBURSEMENT_AMOUNT))
      return NextResponse.json({ error: 'Insufficient funds' }, { status: 400 })

    // Create and sign the transfer transaction
    const block = await api.rpc.chain.getBlock()
    const tx = await transfer(
      api as unknown as ApiPromise,
      address,
      process.env.CLAIM_OPERATOR_DISBURSEMENT_AMOUNT,
    )
    const hash = await tx.signAndSend(wallet)
    const txReceipt = {
      ownerAccount: wallet.address,
      status: 'pending',
      submittedAtBlockHash: block.block.header.hash.toHex(),
      submittedAtBlockNumber: block.block.header.number.toNumber(),
      call: 'balances.transferKeepAlive',
      txHash: hash.hash.toHex(),
      blockHash: '',
    }

    await saveClaim(session, chainMatch.network, claimType, claim, txReceipt)

    if (!claimStats) {
      const slackMessage = await sendSlackStatsMessage(1)
      if (slackMessage) await saveClaimStats(session, chainMatch.network, claimType, slackMessage)
    } else {
      await sendSlackStatsMessage(
        claimStats[0].data.totalClaims + 1,
        claimStats[0].data.slackMessageId,
      )
      await updateClaimStats(claimStats[0].ref, claimStats[0].data, session)
    }

    await api.disconnect()

    await updateUser(dbSession[0].ref, dbSession[0].data, AuthProvider.subspace, {
      ...dbSession[0].data.subspace,
      disbursements:
        dbSession[0].data.subspace && dbSession[0].data.subspace.disbursements
          ? {
              ...dbSession[0].data.subspace.disbursements,
              stakeWars2: true,
            }
          : {
              stakeWars2: true,
            },
    })

    return NextResponse.json({
      message: 'Disbursement claimed successfully',
      hash: hash.hash.toHex(),
    })
  } catch (error) {
    console.error('Error processing disbursement:', error)
    return NextResponse.json({ error: 'Failed to claim disbursement' }, { status: 500 })
  }
}
