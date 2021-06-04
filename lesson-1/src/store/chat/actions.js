
import { ADDCHAT, ADDMESSAGE, DELETECHAT, DELETEMESSAGE }  from "./types";

export const addChat = (chat) => {
    return { type: ADDCHAT, payload: chat };
}

export const addMessage = (chatId, content) => {
    return { type: ADDMESSAGE, payload: { id: chatId, message: content } };
}

export const deleteChat = (chatId) => {
    return { type: DELETECHAT, payload: chatId };
}

export const deleteMessage = (chatId, messageIndex) => {
    return { type: DELETEMESSAGE, payload: { chatId, messageIndex } };
}