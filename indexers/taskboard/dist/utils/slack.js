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
exports.sendSlackMessage = void 0;
const sendSlackMessage = (message, blocks, messageIdToEdit) => __awaiter(void 0, void 0, void 0, function* () {
    const token = process.env.SLACK_TOKEN;
    const conversationId = process.env.SLACK_CONVERSATION_ID || "";
    const url = messageIdToEdit
        ? "https://slack.com/api/chat.update"
        : "https://slack.com/api/chat.postMessage";
    let payload = {
        channel: conversationId,
        text: message,
        blocks: blocks,
    };
    if (messageIdToEdit) {
        payload.ts = messageIdToEdit;
    }
    try {
        const response = yield fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
        });
        const data = (yield response.json());
        if (!data.ok) {
            throw new Error(data.error);
        }
        return data.ts;
    }
    catch (e) {
        console.error("Error sending slack message", e);
        return undefined;
    }
});
exports.sendSlackMessage = sendSlackMessage;
