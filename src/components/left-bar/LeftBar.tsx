import React from "react";
import ChatsList from "../chats-list/ChatsList";
import ChatsSearchInput from "../chats-search/ChatsSearchInput";

import "./LeftBar.scss";

const LeftBar: React.FC = () => {
    return (
        <div className="leftbar-container">
            <ChatsSearchInput/>
            <ChatsList/>
        </div>
    );
};

export default LeftBar;