import moment from "moment";
import React, { useEffect, useState } from "react";
import { UserAvatar } from "../../containers/userAvatar/userAvatar";
import "./ChatItem.scss";

export type ChatItemProps = {
    name: string,
    updatedAt: Date,
    lastMessageText?: string,
    unread: number,
    isActive: boolean,
    onClick: () => void,
};

const ChatItem: React.FC<ChatItemProps> = ({
    name,
    updatedAt,
    lastMessageText,
    unread,
    onClick,
    isActive,
}) => {
    const [humanizedUpdatedAt, setHumanizedUpdatedAt] = useState(moment().format('MM.DD.YYYY'));

    useEffect(() => {
        const momentNow = moment();
        const momentUpdatedAt = moment(updatedAt);
        setHumanizedUpdatedAt(momentUpdatedAt.format('MM.DD.YYYY'));
        if(momentNow.year() === momentUpdatedAt.year())
            setHumanizedUpdatedAt(momentUpdatedAt.format('MM.DD'));
        if(momentNow.year() === momentUpdatedAt.year() && momentNow.dayOfYear() === momentUpdatedAt.dayOfYear())
            setHumanizedUpdatedAt(momentUpdatedAt.format('HH:mm'));
    }, [updatedAt]);
    return (
        <div className={`chat-item ${isActive ? 'active' : ''} `} onClick={() => onClick()}>
            <UserAvatar nickname={name} size={40}></UserAvatar>
            <div className="chat-info">
                <div className="user-line">
                    <span>{name}</span>
                    <span className="updated-at">{humanizedUpdatedAt}</span>
                </div>
                <div className="last-message">
                    <span className="message-content">{lastMessageText}</span>
                    {unread > 0 && (
                        <span className="unread-count">{unread}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatItem;