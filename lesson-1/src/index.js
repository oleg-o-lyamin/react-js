import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Switch, Route, useParams, withRouter } from "react-router-dom";
import { Provider, connect } from "react-redux";
import { store, mapStateToProps, mapDispatchToProps } from "./store";
import { MessageField, ChatList } from "./components";

const ChatListContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatList));
const MessageFieldContainer = connect(mapStateToProps, mapDispatchToProps)(MessageField);

class Header extends React.Component {
    render() {
        return <h1 style={{ padding: "20px" }}>Чат</h1>
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

ReactDOM.render(<BrowserRouter><Provider store={store}><Layout /></Provider></BrowserRouter>, document.getElementById("root"))