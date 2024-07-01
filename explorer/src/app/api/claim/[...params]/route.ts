import { ApiPromise, Keyring, WsProvider } from '@polkadot/api'
import { stringToU8a } from '@polkadot/util'
import { cryptoWaitReady, decodeAddress, signatureVerify } from '@polkadot/util-crypto'
import { chains } from 'constants/chains'
import { CLAIM_TYPES } from 'constants/routes'
import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from 'utils/auth/verifyToken'
import { findClaim, findClaimStats, saveClaim, saveClaimStats, updateClaimStats } from 'utils/fauna'
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
    await cryptoWaitReady()

    const pathname = req.nextUrl.pathname
    const chain = pathname.split('/').slice(3)[0]
    const claimType = pathname.split('/').slice(4)[0]
    if (claimType !== CLAIM_TYPES.OperatorDisbursement)
      return NextResponse.json({ error: 'Invalid claim type' }, { status: 400 })

    const chainMatch = chains.find((c) => c.urls.page === chain)
    if (!chainMatch) return NextResponse.json({ error: 'Invalid chain' }, { status: 400 })

    const previousClaim = await findClaim(session.id, chainMatch.urls.page, claimType)
    if (previousClaim) return NextResponse.json({ error: 'Already claimed' }, { status: 400 })

    const claim = await req.json()
    const { message, signature, address } = claim

    // Verify the signature
    const publicKey = decodeAddress(address)
    const isValid = signatureVerify(stringToU8a(message), signature, publicKey).isValid
    if (!isValid) return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })

    const claimStats = await findClaimStats(chainMatch.urls.page, claimType)

    // Connect to the Polkadot node
    const wsProvider = new WsProvider(chainMatch.urls.rpc)
    const api = await ApiPromise.create({ provider: wsProvider })

    // Create a keyring instance from wallet in environments variables
    const keyring = new Keyring({ type: 'sr25519' })
    const wallet = keyring.addFromUri(process.env.WALLET_CLAIM_OPERATOR_DISBURSEMENT_URI)

    // Get wallet free balance
    const {
      data: { free },
    } = (await api.query.system.account(wallet.address)).toJSON() as { data: { free: string } }
    if (BigInt(free) < BigInt(process.env.CLAIM_WALLET_LOW_FUND_WARNING || 1000 * 10 ** 18))
      await walletBalanceLowSlackMessage(formatUnitsToNumber(free).toString(), wallet.address)

    if (BigInt(free) <= BigInt(process.env.CLAIM_OPERATOR_DISBURSEMENT_AMOUNT))
      return NextResponse.json({ error: 'Insufficient funds' }, { status: 400 })

    // Create and sign the transfer transaction
    const block = await api.rpc.chain.getBlock()
    const transfer = api.tx.balances.transferKeepAlive(
      address,
      process.env.CLAIM_OPERATOR_DISBURSEMENT_AMOUNT,
    )
    const hash = await transfer.signAndSend(wallet)
    const tx = {
      ownerAccount: wallet.address,
      status: 'pending',
      submittedAtBlockHash: block.block.header.hash.toHex(),
      submittedAtBlockNumber: block.block.header.number.toNumber(),
      call: 'balances.transferKeepAlive',
      txHash: hash.hash.toHex(),
      blockHash: '',
    }

    await saveClaim(session, chainMatch.urls.page, claimType, claim, tx)

    if (!claimStats) {
      const slackMessage = await sendSlackStatsMessage(1)
      if (slackMessage) await saveClaimStats(session, chainMatch.urls.page, claimType, slackMessage)
    } else {
      await sendSlackStatsMessage(
        claimStats[0].data.totalClaims + 1,
        claimStats[0].data.slackMessageId,
      )
      await updateClaimStats(claimStats[0].ref, claimStats[0].data, session)
    }

    await api.disconnect()

    return NextResponse.json({
      message: 'Disbursement claimed successfully',
      hash: hash.hash.toHex(),
    })
  } catch (error) {
    console.error('Error processing disbursement:', error)
    return NextResponse.json({ error: 'Failed to claim disbursement' }, { status: 500 })
  }
}
