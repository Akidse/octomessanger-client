import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { UserAvatar } from "../../containers/userAvatar/userAvatar";

import "./RightBar.scss";

const RightBar: React.FC = () => {
    const {activeUser, activeChat} = useSelector((state: RootState) => state.messanger);
    return (
        <div className="right-bar-container">
            {activeUser && (
                <div className="user-info">
                    <UserAvatar nickname={activeUser.nickname} size={100}></UserAvatar>
                    <div className="nickname">{activeUser.nickname}</div>
                </div>
            )}
            {activeChat && (
                <div className="user-info">
                    <UserAvatar nickname={activeChat.name} size={100}></UserAvatar>
                    <div className="nickname">{activeChat.name}</div>
                </div>
            )}
        </div>
    );
};

export default RightBar;