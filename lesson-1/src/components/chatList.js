import React from "react"
import { Input, InputAdornment, ListItem, ListItemText, InputLabel, ListItemSecondaryAction, IconButton } from "@material-ui/core"
import { Add, Delete } from "@material-ui/icons"
import { Link } from "react-router-dom";

const API_URL = "https://api.github.com/gists/public";

export class ChatList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            error: false,
            isLoading: false,
        }
    }

    render() {
        if (this.state.isLoading)
            return <div><h3>Loading...</h3></div>
        else if (!this.state.error)
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
        else
            return <div>
                <h3>Error</h3>
                <button onClick={this.loadChats}>Retry</button>
            </div>
    }

    loadChats = () => {
        if (this.props.chats.length == 0) {
            this.setState({ error: false });
            this.setState({ isLoading: true });
            fetch(API_URL).
                then(res => res.json()).
                then(result => {
                    let count = 0;
                    for (const item of result) {
                        if (item.description) { this.props.addChat(item.description); count++; }
                        if (count == 3) break;
                    }
                }).
                catch(err => { console.log(err); this.setState({ error: true }); }).
                finally(() => this.setState({ isLoading: false }));
        }
    }

    componentDidMount() {
        this.loadChats();
    }

    handleChange = ({ target }) => {
        this.setState({ value: target.value });
    }

    add = () => {
        if (this.state.value != "") {
            this.props.addChat(this.state.value);
            this.setState({ value: "" });
        }
    }

    delete = (id) => {
        this.props.deleteChat(id);
        if (this.props.chatId == id) this.props.history.push('/index');
    }
}