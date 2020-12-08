import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../app/userReducer";

export type IMessageItem = {
    _id?: string,
    type: any,
    content: string,
    ownerId: string,
    isSending?: boolean,
    psevdoId?: string,
    updatedAt: Date,
};

export type ISubscription = {
    _id?: string,
    userId: string,
    chatId?: string,
    createdAt: Date,
    updatedAt: Date,
};

export enum ChatType {
    USER = "USER",
};

export type ChatItem = {
    _id?: string,
    name: string,
    updatedAt: Date,
    createdAt: Date,
    messages: IMessageItem[],
    subscriptions: ISubscription[],
    type: ChatType,
    unreadCount: number,
};

export type LeftBarState = {
    searchText: string | null,
    isLoading: boolean,
    foundUsers: IUser[]
};

const initialState: LeftBarState = {
    searchText: null,
    isLoading: false,
    foundUsers: [],
};

const LeftBarReducer = createSlice({
    name: "leftbar",
    initialState,
    reducers: {
        setIsLoading: (state, action) => {
            state.isLoading = action.payload.state;
        },
        searchSuccess: (state, action) => {
            state.foundUsers = action.payload.foundUsers;
            state.isLoading = false;
        },
        searchFailure: (state, action) => {

        },
        searchTextTyping: (state, action) => {
            state.isLoading = true;
            state.searchText = action.payload.searchText;
        },
        clearSearch: (state, action) => {
            state.isLoading = false;
            state.searchText = null;
            state.foundUsers = [];
        },
    }
});

export const {searchSuccess, searchFailure, searchTextTyping, clearSearch, setIsLoading } = LeftBarReducer.actions;
export default LeftBarReducer.reducer;