
import { ADD_CHAT, ADD_MESSAGE, DELETE_CHAT, DELETE_MESSAGE } from "./types";

export const addChat = (chat) => {
    return { type: ADD_CHAT, payload: chat };
}

export const addMessage = (chatId, content) => {
    return { type: ADD_MESSAGE, payload: { id: chatId, message: content } };
}

export const deleteChat = (chatId) => {
    return { type: DELETE_CHAT, payload: chatId };
}

export const deleteMessage = (chatId, messageIndex) => {
    return { type: DELETE_MESSAGE, payload: { chatId, messageIndex } };
}