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

export const sendSlackStatsMessage = async (text: string, messageIdToEdit?: string) => {
  const blocks: SlackBlock[] = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: 'Consensus Indexer Stats',
      },
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text,
      },
    },
  ]
  return await sendSlackMessage('Last block processed', blocks, messageIdToEdit)
}