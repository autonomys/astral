interface SlackResponse {
  ok: boolean;
  error?: string;
  ts?: string;
}

interface SlackBlock {
  type: string;
  text: {
    type: string;
    text: string;
  };
}

interface SlackPayload {
  channel: string;
  text: string;
  blocks: SlackBlock[];
  ts?: string;
}

export const sendSlackMessage = async (
  message: string,
  blocks: any[],
  messageIdToEdit?: string,
): Promise<string | undefined> => {
  const token = process.env.SLACK_TOKEN;
  const conversationId = process.env.SLACK_CONVERSATION_ID || '';
  const url = messageIdToEdit
    ? 'https://slack.com/api/chat.update'
    : 'https://slack.com/api/chat.postMessage';

  const payload: SlackPayload = {
    channel: conversationId,
    text: message,
    blocks: blocks,
  };

  if (messageIdToEdit) {
    payload.ts = messageIdToEdit;
  }

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = (await response.json()) as SlackResponse;

    if (!data.ok) {
      throw new Error(data.error);
    }

    return data.ts;
  } catch (e) {
    console.error('Error sending slack message', e);
    return undefined;
  }
};
