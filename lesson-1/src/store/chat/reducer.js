
import { ADD_CHAT, ADD_MESSAGE, DELETE_CHAT, DELETE_MESSAGE } from "./types";

const chatsInitialState = {
    chats: [],
}

export function chatReducer(state = chatsInitialState, action) {
    switch (action.type) {
        case ADD_CHAT:
            return {
                ...state,
                chats: [...state.chats, { id: Math.floor(Math.random() * 1000000), name: action.payload, messages: [] }]
            };
        case ADD_MESSAGE:
            const index = state.chats.findIndex(chat => chat.id == action.payload.id);

            return {
                ...state,
                chats: [
                    ...state.chats.slice(0, index), { ...state.chats[index], messages: [...state.chats[index].messages, action.payload.message] }, ...state.chats.slice(index + 1)
                ]
            };
        case DELETE_CHAT:
            return {
                ...state,
                chats: [
                    ...state.chats.filter(chat => chat.id != action.payload)
                ]
            };
        case DELETE_MESSAGE:
            const { chatId, messageIndex } = action.payload;
            const chatIndex = state.chats.findIndex(chat => chat.id == chatId);

            return {
                ...state,
                chats: [
                    ...state.chats.slice(0, chatIndex),
                    {
                        ...state.chats[chatIndex],
                        messages: [
                            ...state.chats[chatIndex].messages.filter(
                                (el, index) => index != messageIndex
                            )
                        ]
                    },
                    ...state.chats.slice(chatIndex + 1)
                ]
            };
        default:
            return state;
    }
}