import React from "react";

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
            <div className="avatar"></div>
            <div className="user-info">{name}</div>
        </div>
    );
};

export default ChatListUser;