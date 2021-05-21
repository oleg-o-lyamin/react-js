import React from "react"
import ReactDOM from "react-dom"
import styles from "./index.module.css"

class Message extends React.Component {
    render() {
        return <div className={styles.message}>
            <div>
                <span>{this.props.message.content}</span>
            </div>
            <div>
                <span className={styles.user}>by {this.props.message.sender}</span>
                <span className={styles.date}>on {this.props.message.date}</span>
            </div>
        </div>
    }
}

class MessageField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
        this.ref = React.createRef();
    }

    saveMessage = (msg, sender, flag) => {
        this.setState({ messages: [...this.state.messages, { content: msg, date: new Date().toUTCString(), sender: sender, flag: flag }] });
    }

    handleClick = () => {
        //this.setState({ messages: [...this.state.messages, { content: this.ref.current.value, date: new Date().toUTCString(), sender: "User", flag: 0 }] });
        this.saveMessage(this.ref.current.value, "User", 0);
    }

    render() {
        const messages = this.state.messages.map((message, index) => (<Message key={index} message={message} />));

        return <div>
            {messages}
            <input type="text" ref={this.ref} />
            <button onClick={this.handleClick}>Send</button>
        </div>
    }

    componentDidUpdate() {
        if (this.state.messages[this.state.messages.length - 1].flag == 0) {
            setTimeout(() => {
                this.saveMessage("Received!", "Bot", 1);
            }, 1000);
        }
    }
}

ReactDOM.render(<MessageField />, document.getElementById("root"))