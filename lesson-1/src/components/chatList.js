import React from "react"
import { Input, InputAdornment, ListItem, ListItemText, InputLabel, ListItemSecondaryAction, IconButton } from "@material-ui/core"
import { Add, Delete } from "@material-ui/icons"
import { Link } from "react-router-dom";

export class ChatList extends React.Component {
    render() {
        const { chats, onDelete, onAdd, onChange, value } = this.props;

        return <div style={{ width: "30%", padding: "20px" }}>
            <div style={{ height: "100%" }}>
                {
                    chats.map((chat, index) => (
                        <ListItem key={index} style={{}} ContainerComponent="div">
                            <Link to={`/chats/${chat.id}`}>
                                <ListItemText primary={chat.name} />
                            </Link>
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => { onDelete(chat.id) }}>
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
                value={value}
                fullWidth={true}
                onChange={onChange}
                endAdornment={
                    <InputAdornment>
                        <Add onClick={onAdd} />
                    </InputAdornment>
                }
            />
        </div >
    }
}