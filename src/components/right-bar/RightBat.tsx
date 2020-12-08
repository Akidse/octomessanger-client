import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

import "./RightBar.scss";

const RightBar: React.FC = () => {
    const {activeUser, activeChat} = useSelector((state: RootState) => state.messanger);
    return (
        <div className="right-bar-container">
            {activeUser && (
                <div className="user-info">
                    <div className="avatar"></div>
                    <div className="nickname">{activeUser.nickname}</div>
                </div>
            )}
            {activeChat && (
                <div className="user-info">
                    <div className="avatar"></div>
                    <div className="nickname">{activeChat.name}</div>
                </div>
            )}
        </div>
    );
};

export default RightBar;