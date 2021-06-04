
import { ADDCHAT, ADDMESSAGE, DELETECHAT, DELETEMESSAGE } from "./types";

const chatsInitialState = {
    chats: [{ id: 100, name: "Room #1", messages: [] }, { id: 200, name: "Room #2", messages: [] }],
}

export function chatReducer(state = chatsInitialState, action) {
    switch (action.type) {
        case ADDCHAT:
            return {
                ...state,
                chats: [...state.chats, { id: Math.floor(Math.random() * 1000000), name: action.payload, messages: [] }]
            };
        case ADDMESSAGE:
            const index = state.chats.findIndex(chat => chat.id == action.payload.id);

            return {
                ...state,
                chats: [
                    ...state.chats.slice(0, index), { ...state.chats[index], messages: [...state.chats[index].messages, action.payload.message] }, ...state.chats.slice(index + 1)
                ]
            };
        case DELETECHAT:
            return {
                ...state,
                chats: [
                    ...state.chats.filter(chat => chat.id != action.payload)
                ]
            };
        case DELETEMESSAGE:
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