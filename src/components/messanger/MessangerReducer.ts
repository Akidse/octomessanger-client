import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { IUser } from "../../app/userReducer";
import { ChatItem, ChatType } from "../left-bar/LeftBarReducer";

export type MessangerReducerState = {
    activeChat: ChatItem | null,
    activeUser: IUser | null,
    socket: typeof Socket | null,
    chats: ChatItem[],
    isLoading: boolean,
};

const initialState: MessangerReducerState = {
    activeChat: null,
    activeUser: null,
    socket: null,
    chats: [],
    isLoading: false,
};

const MessangerReducer = createSlice({
    name: "messangerReducer",
    initialState,
    reducers: {
        loadChats: (state, action) => {
            state.isLoading = true;
        },
        loadChatsFailure: (state, action) => {

        },
        loadChatsSuccess: (state, action) => {
            state.chats = action.payload.chats;
            state.isLoading = false;
        },
        setActiveChat: (state, action) => {
            state.activeChat = state.chats.find((c) => c._id === action.payload.chat._id) || null;
            state.activeUser = null;
        },
        setActiveUser: (state, action) => {
            let chat = state.chats.find((c) => c.type === ChatType.USER && c.subscriptions.find((s) => s.userId === action.payload.user._id));
            if(chat)
                state.activeChat = chat;
            else {
                state.activeUser = action.payload.user;
                state.activeChat = null;
            }
        },
        onSocketConnect: (state, action) => {
            state.socket = action.payload.socket;
        },
        sendMessage: (state, action) => {
            if(!state.activeChat && state.activeUser) {
                state.activeChat = {
                    name: state.activeUser.nickname,
                    updatedAt: new Date(),
                    createdAt: new Date(),
                    messages: [],
                    subscriptions: [],
                    type: ChatType.USER,
                    unreadCount: 0,
                };
                state.activeUser = null;
            };
        },
        sendMessageSuccess: (state, action) => {
            const chat = state.chats.find((c) => c._id === action.payload.chat._id);
            if(!chat)
                return;

            const foundMessage = chat.messages.find((m) => m.psevdoId === action.payload.psevdoId);

            if(!foundMessage)
                return;
            foundMessage.psevdoId = undefined;
            foundMessage.isSending = false;
            foundMessage.updatedAt = action.payload.message.updatedAt;
            foundMessage._id = action.payload.message._id;

            chat.updatedAt = action.payload.chat.updatedAt;
        },
        addMessageStub: (state, action) => {
            const chat = state.chats.find((c) => c._id === action.payload.chatId);
            if(!chat)
                return;

            chat.messages.push({
                content: action.payload.message,
                ownerId: action.payload.ownerId,
                type: "TEXT",
                psevdoId: action.payload.psevdoId,
                isSending: true,
                updatedAt: new Date(),
            });
        },
        chatCreationSuccess: (state, action) => {
            state.activeChat = action.payload.chat;
            state.chats.push(action.payload.chat);
            state.activeUser = null;
        },
        newMessage: (state, action) => {
            const chat = state.chats.find((c) => c._id === action.payload.chat._id);
            if(!chat)
                return;
            const userSubscription = chat.subscriptions.find((s) => s.userId === action.payload.userId);
            if(!userSubscription)
                return;

            chat.messages.push(action.payload.message);
            chat.updatedAt = action.payload.chat.updatedAt;
            chat.unreadCount = chat.messages.filter((m) => m.ownerId !== action.payload.userId && m.updatedAt > userSubscription?.updatedAt).length || 0;
        },
        readChat: (state, action) => {
            state.socket?.emit('read_chat', {chatId: action.payload.chatId});
        },
        readChatSuccess: (state, action) => {
            const chat = state.chats.find((c) => c._id === action.payload.subscription.chatId);
            if(!chat)
                return;
            const userSubscription = chat.subscriptions.find((s) => s.userId === action.payload.subscription.userId);
            chat.unreadCount = chat.messages.filter((m) => m.ownerId !== action.payload.subscription.userId && m.updatedAt > action.payload.subscription.updatedAt).length || 0;
            if(!userSubscription)
                return;

            userSubscription.updatedAt = action.payload.subscription.updatedAt;
        },
        onCompanionChatRead: (state, action) => {
            const chat = state.chats.find((c) => c._id === action.payload.subscription.chatId);
            if(!chat)
                return;
            const companionSubscription = chat.subscriptions.find((s) => s.userId === action.payload.userId);

            if(!companionSubscription)
                return;
            
            companionSubscription.updatedAt = action.payload.subscription.updatedAt;
        }
    }
});

export const { 
    setActiveChat,
    setActiveUser,
    sendMessage,
    sendMessageSuccess,
    onSocketConnect,
    addMessageStub,
    chatCreationSuccess,
    loadChats,
    loadChatsFailure,
    loadChatsSuccess,
    newMessage,
    readChat,
    readChatSuccess,
    onCompanionChatRead,
} = MessangerReducer.actions;
export default MessangerReducer.reducer;