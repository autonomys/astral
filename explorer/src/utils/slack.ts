import { defaultChain } from '@/constants'

interface SlackBlock {
  type: string
  text: {
    type: string
    text: string
  }
}

interface SlackPayload {
  channel: string
  text: string
  blocks: SlackBlock[]
  ts?: string
}

export const sendSlackMessage = async (
  message: string,
  blocks: SlackBlock[],
  messageIdToEdit?: string,
): Promise<string | undefined> => {
  const token = process.env.SLACK_TOKEN
  const conversationId = process.env.SLACK_CONVERSATION_ID || ''
  const url = messageIdToEdit
    ? 'https://slack.com/api/chat.update'
    : 'https://slack.com/api/chat.postMessage'

  const payload: SlackPayload = {
    channel: conversationId,
    text: message,
    blocks: blocks,
  }

  if (messageIdToEdit) {
    payload.ts = messageIdToEdit
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!data.ok) {
      throw new Error(data.error)
    }

    return data.ts || undefined
  } catch (e) {
    console.error('Error sending slack message', e)
  }
}

export const sendSlackStatsMessage = async (requestCount: number, messageIdToEdit?: string) => {
  const blocks: SlackBlock[] = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: 'Claim stats',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `Total requests: ${requestCount} :autonomys: `,
      },
    },
  ]
  return await sendSlackMessage('Wallet balance low', blocks, messageIdToEdit)
}

export const walletBalanceLowSlackMessage = async (balance: string, wallet: string) => {
  const blocks: SlackBlock[] = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: 'Wallet balance is low',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `The wallet balance has ${balance} ${defaultChain.token.symbol}, please refill the wallet. \`${wallet}\``,
      },
    },
  ]
  return await sendSlackMessage('Wallet balance low', blocks)
}
