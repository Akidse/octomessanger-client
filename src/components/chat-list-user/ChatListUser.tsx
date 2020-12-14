import React from "react";
import { UserAvatar } from "../../containers/userAvatar/userAvatar";

import "./ChatListUser.scss";

export type ChatListUserProps = {
    name: string,
    isActive: boolean,
    onClick: any,
};

const ChatListUser: React.FC<ChatListUserProps> = ({
    name,
    isActive,
    onClick
}) => {
    return (
        <div className={`chat-list-user-item ${isActive?'active':''}`} onClick={() => onClick()}>
            <UserAvatar nickname={name} size={40}></UserAvatar>
            <div className="user-info">{name}</div>
        </div>
    );
};

export default ChatListUser;