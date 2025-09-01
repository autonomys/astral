import { sendSlackMessage } from '../utils/slack';

interface JobData {
  title: string;
  path?: string;
  message?: string;
  logData?: any;
  messageId?: string;
}

interface Job {
  data: JobData;
}

interface NotificationResult extends JobData {
  slackMessage?: string;
}

export const slackNotification = async (job: Job): Promise<NotificationResult> => {
  const { title, path, message, logData, messageId } = job.data;
  const result: NotificationResult = {
    title,
    path,
    message,
    logData,
    messageId,
  };

  try {
    const blocks = [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: title,
        },
      },
    ];
    if (path) {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Path: ${path}`,
        },
      });
    }
    if (message) {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: message,
        },
      });
    }
    if (logData) {
      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `\`\`\`${JSON.stringify(logData, null, 2).slice(0, 25000)}\`\`\``,
        },
      });
    }

    const slackMessage = await sendSlackMessage(title, blocks, messageId);
    result.slackMessage = slackMessage;

    return result;
  } catch (err) {
    console.error('Error in slackNotification:', err);
    throw new Error(`Failed to send slack notification: ${err}`);
  }
};
