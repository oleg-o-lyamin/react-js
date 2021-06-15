import React from "react"
import styles from "./message.module.css"

export class Message extends React.Component {
    render() {
        const { content, date, sender, flag } = this.props.message;

        const delLayer = (flag == 0) ? <div style={{ padding: "10px", color: "blue", fontSize: "20px" }} onClick={this.props.ondelete}>X</div> : <div></div>

        return <div className={`${styles.message} ${flag == 1 ? styles.right : styles.left}`}>
            <div style={{ display: "flex" }}>
                {delLayer}
                <div>
                    <div style={{ backgroundColor: "lightgray", padding: "10px", borderRadius: "10px" }}>
                        <span>{content}</span>
                    </div >
                    <div>
                        <span className={styles.user}>by {sender}</span>
                        <span className={styles.date}>on {date}</span>
                    </div>
                </div>
            </div>
        </div >
    }
}