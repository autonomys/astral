const sendSlackMessage = async (message, blocks, messageIdToEdit) => {
  const token = process.env.SLACK_TOKEN;
  const conversationId = process.env.SLACK_CONVERSATION_ID || "";
  const url = messageIdToEdit
    ? "https://slack.com/api/chat.update"
    : "https://slack.com/api/chat.postMessage";

  const payload = {
    channel: conversationId,
    text: message,
    blocks: blocks,
  };

  if (messageIdToEdit) {
    payload.ts = messageIdToEdit;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.error);
    }

    return data.ts || undefined;
  } catch (e) {
    console.error("Error sending slack message", e);
  }
};

module.exports = { sendSlackMessage };
