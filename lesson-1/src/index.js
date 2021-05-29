import React from "react"
import ReactDOM from "react-dom"
import styles from "./index.module.css"
import { Input, InputAdornment, List, ListItem, ListItemText, TextField, InputLabel } from "@material-ui/core"
import { Send, Add } from "@material-ui/icons"
import { BrowserRouter, Switch, Route, Link, useParams, withRouter } from "react-router-dom";

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
            messages: {},
            value: "",
            updating: false,
        };
        this.input = React.createRef();
    }

    saveMessage = (chatId, msg, sender, flag) => {
        if (this.state.messages[chatId] == undefined) this.state.messages[chatId] = [];
        this.state.messages[chatId] = [...this.state.messages[chatId], { content: msg, date: new Date().toUTCString(), sender: sender, flag: flag }];

        this.setState(
            { 
                messages: this.state.messages,
            },
            () => {
                const obj = document.getElementById("scrollDiv");
                obj.scrollTop = obj.scrollHeight;
            }
        );
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
        const messages = (this.state.messages[chatId] == undefined) ? [] : this.state.messages[chatId].map((message, index) => (<Message key={index} message={message} />));

        return <div style={{ width: "70%" }}>
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

    componentDidUpdate(prevProps) {
        const obj = document.getElementById("scrollDiv");
        obj.scrollTop = obj.scrollHeight;
        this.input.current.focus();

        const {chatId} = this.props;

        if (!this.state.updating && this.state.messages[chatId] != undefined &&
            this.state.messages[chatId].length > 0 &&
            this.state.messages[chatId][this.state.messages[chatId].length - 1].flag == 0) 
        {
            this.state.updating = true;
            const chatId = this.props.chatId;
            setTimeout(() => {
                this.saveMessage(chatId, "Received!", "Bot", 1);
                this.state.updating = false;
            }, 1000);
        }
    }
}

class Header extends React.Component {
    render() {
        return <h1>Чат</h1>
    }
}

class ChatList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: ["Chat Room #1", "Chat Room #2"],
            value: "",
        }
    }

    render() {
        return <div style={{ width: "30%" }}>
            {
                this.state.chats.map((chat, index) => (
                    <ListItem key={index}>
                        <Link to={`/chats/${index}`}>
                            <ListItemText primary={chat} />
                        </Link>
                    </ListItem>
                ))
            }
            <InputLabel htmlFor="chatLabel">Введите название чата...</InputLabel>
            <Input
                id="chatLabel"
                value={this.state.value}
                fullWidth={true}
                onChange={this.handleChange}
                endAdornment={
                    <InputAdornment>
                        <Add onClick={this.handleClick} />
                    </InputAdornment>
                }
            />
        </div>
    }   

    handleChange = ({ target }) => {
        this.setState({ value: target.value });
    }

    handleClick = () => {
        if (this.state.value != "") {
            this.setState({ chats: [...this.state.chats, this.state.value] });
            this.state.value = "";
        }
    }
}

class Layout extends React.Component {
    render() {
        return <div>
            <Header />
            <div style={{ display: "flex", height: "700px" }}>
                <ChatList />
                <Switch>
                    <Route path="/chats/:chatId" component={
                        () => {
                            const { chatId } = useParams();
                            return <MessageField chatId={chatId} />;
                        }
                    } />
                    <Route>
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <h1>Выберите чат.</h1>
                        </div>
                    </Route>
                </Switch>
            </div>
        </div>
    }
}

ReactDOM.render(<BrowserRouter><Layout /></BrowserRouter>, document.getElementById("root"))