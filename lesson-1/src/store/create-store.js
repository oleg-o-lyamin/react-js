import { chatReducer, addChat, addMessage, deleteChat, deleteMessage } from "./chat";
import { createStore, combineReducers } from "redux";

const reducers = combineReducers({ chatReducer });

export const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const mapStateToProps = (state) => ({ chats: state.chatReducer.chats });
export const mapDispatchToProps = (dispatch) => {
    return {
        addChat: (chat) => dispatch(addChat(chat)),
        addMessage: (chatId, content) => dispatch(addMessage(chatId, content)),
        deleteChat: (chatId) => dispatch(deleteChat(chatId)),
        deleteMessage: (chatId, messageIndex) => dispatch(deleteMessage(chatId, messageIndex)),
    }
};