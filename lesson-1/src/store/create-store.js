import { chatReducer, addChat, addMessage, deleteChat, deleteMessage } from "./chat";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { botSendMessage } from "./bot-send-message";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
};

const combinedReducers = combineReducers({ chatReducer });
const persistedReducers = persistReducer(persistConfig, combinedReducers);

export const store = createStore(persistedReducers,
    compose(
        applyMiddleware(botSendMessage),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export const mapStateToProps = (state) => ({ chats: state.chatReducer.chats });
export const mapDispatchToProps = (dispatch) => {
    return {
        addChat: (chat) => dispatch(addChat(chat)),
        addMessage: (chatId, content) => dispatch(addMessage(chatId, content)),
        deleteChat: (chatId) => dispatch(deleteChat(chatId)),
        deleteMessage: (chatId, messageIndex) => dispatch(deleteMessage(chatId, messageIndex)),
    }
};

export const persistor = persistStore(store)