import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import MessageItem from "../message-item/MessageItem";
import { closeMessangerChat, readChat, sendMessage, toggleRightPanel } from "../messanger/MessangerReducer";

import "./MessangerContent.scss";
import { loadChatInfo } from "./MessangerContentReducer";

const MessangerContent: React.FC = () => {
    const dispatch = useDispatch();
    const { activeChatLink, activeUser, isRightPanelOpened } = useSelector(
        (state: RootState) => {
            return {
                ...state.messanger,
                activeChatLink: state.messanger.chats.find((c) => c._id === state.messanger.activeChat?._id) || state.messanger.activeChat
            };
        }
    );
    const { user } = useSelector((state: RootState) => state.user);

    const [textareaValue, setTextareaValue] = useState('');

    const scrollableContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if(!activeUser)
            return;

        dispatch(loadChatInfo({user: activeUser}));
    }, [activeUser, dispatch]);

    useEffect(() => {
        if(!scrollableContainerRef || !scrollableContainerRef.current)
            return;

        scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
    }, [activeChatLink?.messages]);

    useEffect(() => {
        if(!activeChatLink || !activeChatLink.unreadCount)
            return;
        dispatch(readChat({chatId: activeChatLink._id}));
    }, [activeChatLink, dispatch]);

    const onTextareaKeyDown = (e: React.KeyboardEvent) => {
        if(e.key === "Enter") {
            e.preventDefault();
            sendMessageEvent(textareaValue);
            return false;
        }
    };

    const sendMessageEvent = (message: string) => {
        if(!message || message.trim().length === 0)
            return;

        setTextareaValue('');
        dispatch(sendMessage({
            message: message,
            receiverId: activeUser?._id,
            chatId: activeChatLink?._id
        }));
    };

    const closeChat = () => {
        dispatch(closeMessangerChat({}));
    };

    if(!activeChatLink && !activeUser)
        return (
            <div className="messanger-content-container">
                <div className="no-items">No chat selected</div>
            </div>
        );

    let items = [(<div className="no-items" key="0">No messages</div>)];

    if(activeChatLink && activeChatLink.messages && activeChatLink.messages.length) {
        let receiver = activeChatLink.subscriptions.find((s) => s.userId !== user?._id);
        items = activeChatLink.messages.map((m) => (
            <MessageItem
                content={m.content}
                updatedAt={m.updatedAt}
                isOwner={m.ownerId === user?._id}
                isLoading={m.isSending || false}
                isRead={receiver? receiver.updatedAt >= m.updatedAt : false}
                key={m._id ? m._id : m.psevdoId}
                >

            </MessageItem>
        ));
    }


    return (
        <div className="messanger-content-container">
            <div className="chat-title">
                <div className="back-btn">
                    <FontAwesomeIcon icon={["fas", "arrow-left"]} onClick={() => closeChat()}/>
                </div>
                <div className="avatar"></div>
                <div className="info">
                    {activeUser && (
                        <>{activeUser.nickname}</>
                    )}
                    {activeChatLink && (
                        <>{activeChatLink.name}</>
                    )}
                </div>
                <div className="actions">
                    {isRightPanelOpened && (
                        <img className="right-column-icon" onClick={() => dispatch(toggleRightPanel({}))} src="/right_column_icon_active.svg" alt="User info"/>
                    )}
                    {!isRightPanelOpened && (
                        <img className="right-column-icon" onClick={() => dispatch(toggleRightPanel({}))} src="/right_column_icon.svg" alt="User info"/>
                    )}
                </div>
            </div>
            <div className="messages-list">
                <div className="messages-wrp" ref={scrollableContainerRef}>
                    {items}
                </div>
            </div>
            <div className="input-form">
                <textarea value={textareaValue} onKeyDown={(e) => onTextareaKeyDown(e, )} onChange={(e) => setTextareaValue(e.target.value)} rows={1}></textarea>
                <FontAwesomeIcon icon={["fas", "paper-plane"]} onClick={() => sendMessageEvent(textareaValue)}/>
            </div>
        </div>
    );
};

export default MessangerContent;