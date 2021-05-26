import React from "react"
import ReactDOM from "react-dom"
import styles from "./index.module.css"
import { Input, InputAdornment, List, ListItem, ListItemText } from "@material-ui/core"
import { Send } from "@material-ui/icons"

class Message extends React.Component {
    render() {
        return <div className={`${styles.message} ${this.props.message.flag == 1 ? styles.right : styles.left}`}>
            < div >
                <span>{this.props.message.content}</span>
            </div >
            <div>
                <span className={styles.user}>by {this.props.message.sender}</span>
                <span className={styles.date}>on {this.props.message.date}</span>
            </div>
        </div >
    }
}

class MessageField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            value: "",
            updating: false,
        };
        this.ref = React.createRef();
    }

    saveMessage = (msg, sender, flag) => {
        this.setState(
            { messages: [...this.state.messages, { content: msg, date: new Date().toUTCString(), sender: sender, flag: flag }] },
            () => {
                const obj = document.getElementById("scrollDiv");
                obj.scrollTop = obj.scrollHeight;
            }
        );
    }

    handleClick = () => {
        this.saveMessage(this.state.value, "User", 0);
        this.state.value = "";
    }

    handleChange = ({ target }) => {
        this.setState({ value: target.value });
    }

    keyPressChange = ({ code }) => {
        if (code == "Enter") this.handleClick();
    }

    render() {
        const messages = this.state.messages.map((message, index) => (<Message key={index} message={message} />));

        return <div style={{ width: "70%" }}>
            <div id="scrollDiv" className={styles.messageField} style={{ width: "100%", height: "100%", overflow: "auto" }}>
                {messages}
            </div>

            <div style={{ alignSelf: "flex-end", width: "100%" }}>
                <Input
                    label="Введите сообщение..."
                    value={this.state.value}
                    onChange={this.handleChange}
                    onKeyPress={this.keyPressChange}
                    fullWidth={true}
                    endAdornment={
                        <InputAdornment>
                            <Send onClick={this.handleClick} />
                        </InputAdornment>
                    }
                />
            </div>
        </div>
    }

    componentDidUpdate() {
        if (!this.state.updating && this.state.messages.length > 0 && this.state.messages[this.state.messages.length - 1].flag == 0) {
            this.state.updating = true;
            setTimeout(() => {
                this.saveMessage("Received!", "Bot", 1);
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
    render() {
        return <div style={{ width: "30%" }}>
            <List>
                <ListItem><ListItemText primary="Chat #1" /></ListItem>
                <ListItem><ListItemText primary="Chat #2" /></ListItem>
                <ListItem><ListItemText primary="Chat #3" /></ListItem>
            </List>
        </div>
    }
}

class Layout extends React.Component {
    render() {
        return <div>
            <Header />
            <div style={{ display: "flex", height: "700px" }}>
                <ChatList />
                <MessageField />
            </div>
        </div>
    }
}

ReactDOM.render(<Layout />, document.getElementById("root"))