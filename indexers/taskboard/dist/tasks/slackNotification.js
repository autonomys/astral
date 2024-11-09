"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slackNotification = slackNotification;
const slack_1 = require("../utils/slack");
function slackNotification(job) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title, path, message, logData, messageId } = job.data;
        let result = {
            title,
            path,
            message,
            logData,
            messageId,
        };
        try {
            const blocks = [
                {
                    type: "header",
                    text: {
                        type: "plain_text",
                        text: title,
                    },
                },
            ];
            if (path) {
                blocks.push({
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `Path: ${path}`,
                    },
                });
            }
            if (message) {
                blocks.push({
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: message,
                    },
                });
            }
            if (logData) {
                blocks.push({
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `\`\`\`${JSON.stringify(logData, null, 2).slice(0, 25000)}\`\`\``,
                    },
                });
            }
            const slackMessage = yield (0, slack_1.sendSlackMessage)(title, blocks, messageId);
            result.slackMessage = slackMessage;
            return result;
        }
        catch (err) {
            console.error("Error in slackNotification:", err);
            throw new Error(`Failed to send slack notification: ${err}`);
        }
    });
}
