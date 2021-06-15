import React from "react"
import styles from "./message.module.css"
import { Input, InputAdornment, InputLabel } from "@material-ui/core"
import { Send } from "@material-ui/icons"
import { Message } from "./message"

export class MessageField extends React.Component {
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

    deleteMessage = (index) => {
        this.props.deleteMessage(this.props.chatId, index);
    }

    render() {
        const { chatId } = this.props;
        const messages = this.props.chats.find(chat => chat.id == chatId).messages.map((message, index) => (<Message key={index} message={message}
            ondelete={() => { this.deleteMessage(index) }} />));

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
    }

    componentDidMount() {
        const obj = document.getElementById("scrollDiv");
        obj.scrollTop = obj.scrollHeight;
        this.input.current.focus();
    }
}