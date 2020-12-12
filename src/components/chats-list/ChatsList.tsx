import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { IUser } from "../../app/userReducer";
import { LoadingSpinner } from "../../containers/loadingSpinner/LoadingSpinner";
import ChatItem from "../chat-item/ChatItem";
import ChatListUser from "../chat-list-user/ChatListUser";
import { ISubscription } from "../left-bar/LeftBarReducer";
import { setActiveChat, setActiveUser } from "../messanger/MessangerReducer";
import "./ChatsList.scss";

const ChatsList: React.FC = () => {
    const dispatch = useDispatch();
    const { isLoading, foundUsers, searchText } = useSelector((state: RootState) => state.leftbar);
    const { chats } = useSelector((state: RootState) => state.messanger);
    const { user } = useSelector((state: RootState) => state.user);
    const {activeChat, activeUser} = useSelector((state: RootState) => state.messanger);
    
    const [activeChatCompanion, setActiveChatCompanion] = useState<ISubscription | undefined>();
    const onUserClick = (user: IUser) => {
        if(activeUser?._id === user._id)
            return;
        dispatch(setActiveUser({user}));
    };

    useEffect(() => {
        setActiveChatCompanion(activeChat?.subscriptions.find((c) => c.userId !== user?._id));
    }, [activeChat, user]);

    const onChatClick = (chat: any) => {
        if(activeChat?._id === chat._id)
            return;

        dispatch(setActiveChat({chat}));
    };

    if(isLoading)
        return (
            <div className="loading-state">
                <LoadingSpinner></LoadingSpinner>
            </div>
        );

    if(searchText?.length && (!foundUsers || !foundUsers.length))
        return (
        <div className="search-user-not-found">Users with nickname <b>{searchText}</b> not found</div>
        );
    if(searchText?.length && foundUsers && foundUsers.length)
        return (
            <div className="chats-list">
                {
                    foundUsers.map((user) => (
                        <ChatListUser
                            key={user._id}
                            name={user.nickname}
                            onClick={() => onUserClick(user)}
                            isActive={!!(activeUser && activeUser._id === user._id) || !!(activeChatCompanion && activeChatCompanion.userId === user._id)}
                        ></ChatListUser>
                    ))
                }
            </div>
        );

    return (
        <div className="chats-list">
            {
                [...chats].map((chat) => (
                    <ChatItem
                        key={chat._id}
                        name={getChatName(chat, user?._id)}
                        onClick={() => onChatClick(chat)}
                        updatedAt={(chat.messages && chat.messages.length? chat.messages[chat.messages.length-1].updatedAt : chat.createdAt)}
                        lastMessageText={(chat.messages && chat.messages.length? chat.messages[chat.messages.length-1].content : undefined)}
                        unread={chat.unreadCount}
                        isActive={!!(activeChat && activeChat._id === chat._id)}
                    ></ChatItem>
                ))
            }
        </div>
    );
}

function getChatName(chat: any, userId: string | undefined): string {
    let receiver = chat.subscriptions.find((s: any) => s.userId !== userId);
    if(!receiver || !userId)
        return 'Unknown chat';
    else
        return receiver.user.nickname;
}
export default ChatsList;