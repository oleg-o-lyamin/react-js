import React from "react"
import ReactDOM from "react-dom"
import styles from "./index.module.css"
import { Input, InputAdornment, List, ListItem, ListItemText, TextField, InputLabel, requirePropFactory, ListItemSecondaryAction, IconButton } from "@material-ui/core"
import { Send, Add, Delete } from "@material-ui/icons"
import { BrowserRouter, Switch, Route, Link, useParams, withRouter, Redirect } from "react-router-dom";
import { createStore, combineReducers } from "redux";
import { Provider, connect } from "react-redux";

// <REDUX>

const ADDCHAT = "@chat/add";
const ADDMESSAGE = "@message/add";
const DELETECHAT = "@chat/delete"

const addChat = (chat) => {
    return { type: ADDCHAT, payload: chat };
}

const addMessage = (chatId, content) => {
    return { type: ADDMESSAGE, payload: { id: chatId, message: content } };
}

const deleteChat = (chatId) => {
    return { type: DELETECHAT, payload: chatId };
}

const chatsInitialState = {
    chats: [{ id: 100, name: "Room #1", messages: [] }, { id: 200, name: "Room #2", messages: [] }],
}

function chatReducer(state = chatsInitialState, action) {
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
        default:
            return state;
    }
}

const reducers = combineReducers({ chatReducer });

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const mapStateToProps = (state) => ({ chats: state.chatReducer.chats });
const mapDispatchToProps = (dispatch) => {
    return {
        addChat: (chat) => dispatch(addChat(chat)),
        addMessage: (chatId, content) => dispatch(addMessage(chatId, content)),
        deleteChat: (chatId) => dispatch(deleteChat(chatId)),
    }
};

// </REDUX>

class Message extends React.Component {
    render() {
        const { content, date, sender, flag } = this.props.message;

        return <div className={`${styles.message} ${flag == 1 ? styles.right : styles.left}`}>
            < div >
                <span>{content}</span>
            </div >
            <div>
                <span className={styles.user}>by {sender}</span>
                <span className={styles.date}>on {date}</span>
            </div>
        </div >
    }
}

class MessageField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            updating: false,
        };
        this.input = React.createRef();
    }

    saveMessage = (chatId, msg, sender, flag) => {
        this.props.addMessage(chatId, { content: msg, date: new Date().toUTCString(), sender: sender, flag: flag });
    }

    handleClick = () => {
        this.saveMessage(this.props.chatId, this.state.value, "User", 0);
        this.state.value = "";
    }

    handleChange = ({ target }) => {
        this.setState({ value: target.value });
    }

    keyPressChange = ({ code }) => {
        if (code == "Enter") this.handleClick();
    }

    render() {
        const { chatId } = this.props;
        const messages = this.props.chats.find(chat => chat.id == chatId).messages.map((message, index) => (<Message key={index} message={message} />));

        return <div style={{ width: "70%", padding: "20px" }}>
            <div id="scrollDiv" className={styles.messageField} style={{ width: "100%", height: "100%", overflow: "auto" }}>
                {messages}
            </div>

            <div style={{ alignSelf: "flex-end", width: "100%" }}>
                <InputLabel htmlFor="contentLabel">Введите сообщение...</InputLabel>
                <Input
                    id="contentLabel"
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyPress={this.keyPressChange}
                    fullWidth={true}
                    endAdornment={
                        <InputAdornment>
                            <Send onClick={this.handleClick} />
                        </InputAdornment>
                    }
                    autoFocus={true}
                    inputRef={this.input}
                />
            </div>
        </div>
    }

    componentDidUpdate() {
        const obj = document.getElementById("scrollDiv");
        obj.scrollTop = obj.scrollHeight;
        this.input.current.focus();

        const { chatId } = this.props;

        if (!this.state.updating) {
            const chat = this.props.chats.find(c => c.id == chatId);
            if (chat.messages.length > 0 && chat.messages[chat.messages.length - 1].flag == 0) {
                this.state.updating = true;
                setTimeout(() => {
                    this.saveMessage(chatId, "Received!", "Bot", 1);
                    this.state.updating = false;
                }, 1000);
            }
        }
    }
}

class Header extends React.Component {
    render() {
        return <h1 style={{ padding: "20px" }}>Чат</h1>
    }
}

class ChatList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        }
    }

    render() {
        return <div style={{ width: "30%", padding: "20px" }}>
            <div style={{ height: "100%" }}>
                {
                    this.props.chats.map((chat, index) => (
                        <ListItem key={index} style={{}} ContainerComponent="div">
                            <Link to={`/chats/${chat.id}`}>
                                <ListItemText primary={chat.name} />
                            </Link>
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => { this.delete(chat.id) }}>
                                    <Delete />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </div>
            <InputLabel htmlFor="chatLabel">Введите название нового чата...</InputLabel>
            <Input
                id="chatLabel"
                value={this.state.value}
                fullWidth={true}
                onChange={this.handleChange}
                endAdornment={
                    <InputAdornment>
                        <Add onClick={this.add} />
                    </InputAdornment>
                }
            />
        </div >
    }

    handleChange = ({ target }) => {
        this.setState({ value: target.value });
    }

    add = () => {
        if (this.state.value != "") {
            this.props.addChat(this.state.value);
            this.state.value = "";
        }
    }

    delete = (id) => {
        this.props.deleteChat(id);
        if (this.props.chatId == id) this.props.history.push('/index');
    }
}

class Layout extends React.Component {
    render() {
        return <div>
            <Header />
            <div style={{ display: "flex", height: "700px" }}>
                <Switch>
                    <Route path="/chats/:chatId" component={
                        () => {
                            const { chatId } = useParams();
                            return <React.Fragment><ChatListContainer chatId={chatId} /><MessageFieldContainer chatId={chatId} /></React.Fragment>;
                        }
                    } />
                    <Route>
                        <ChatListContainer chatId="-1" />
                        <div style={{ width: "70%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
                            <h1>Выберите чат.</h1>
                        </div>
                    </Route>
                </Switch>
            </div>
        </div>
    }
}

const ChatListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatList));
const MessageFieldContainer = connect(mapStateToProps, mapDispatchToProps)(MessageField);

ReactDOM.render(<BrowserRouter><Provider store={store}><Layout /></Provider></BrowserRouter>, document.getElementById("root"))