import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import React from "react";

import "./MessageItem.scss";

export type MessageItemProps = {
    content: string,
    updatedAt: Date,
    isOwner: boolean,
    isLoading: boolean,
    isRead: boolean,
};
const MessageItem: React.FC<MessageItemProps> = ({
    content,
    updatedAt,
    isOwner,
    isLoading,
    isRead,
}) => {
    const humanizedUpdatedAt = moment(updatedAt).format('HH:mm');
    return (
        <div className={`message-item ${isOwner? 'owner': ''} ${isLoading? 'loading': ''} ${isRead? '': 'unread'}`}>
            <div className="message-content">
                {content}
                <div className="message-status">
                    <span className="timestamp">{humanizedUpdatedAt}</span>
                    <span className="status">
                        <FontAwesomeIcon icon={["fas", "check"]} />
                        <FontAwesomeIcon icon={["fas", "check-double"]} />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default MessageItem;