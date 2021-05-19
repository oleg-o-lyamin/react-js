import React from "react"
import ReactDOM from "react-dom"

const messageStack = [];

const Message = ({ message }) => {
    return (
        <React.Fragment>
            <h1>{message}</h1>
        </React.Fragment>
    )
}

const MessageField = ({ messages }) => {
    return messages.map((message, index) => (
        <Message message={message} key={index} />
    ))
}

const InputText = () => {
    const myRef = React.createRef();

    function handleClick(e) {
        e.preventDefault();
        messageStack.push(myRef.current.value);
        reRender();
    };

    return (
        <React.Fragment>
            <input type="text" ref={myRef} />
            <a href="#" onClick={handleClick}>Send</a>
        </React.Fragment>
    );
}

const reRender = () => {
    ReactDOM.render(<React.Fragment><MessageField messages={messageStack} /><InputText /></React.Fragment>, document.getElementById("root"))
}

reRender();