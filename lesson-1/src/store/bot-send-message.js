
import { ADD_MESSAGE, addMessage } from "./chat"

export const botSendMessage = (store) => (next) => (action) => {
    if (action.type == ADD_MESSAGE && action.payload.message.flag == 0) {
        setTimeout(() => store.dispatch(
            addMessage(action.payload.id, { content: "Received!", date: new Date().toUTCString(), sender: "Bot", flag: 1 })
        ), 500)
    }

    return next(action)
}