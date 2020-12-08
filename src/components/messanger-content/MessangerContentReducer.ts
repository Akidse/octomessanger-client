import { createSlice } from "@reduxjs/toolkit";

export type MessangerContentReducerState = {
    isLoading: boolean,
    chatInfo: any,
};

const initialState: MessangerContentReducerState = {
    isLoading: false,
    chatInfo: null,
};

const MessangerContentReducer = createSlice({
    name: "messangercontent",
    initialState,
    reducers: {
        loadChatInfo: (state, action) => {
            state.isLoading = true;
        },
        loadChatInfoSuccess: (state, action) => {
            state.isLoading = false;
            state.chatInfo = action.payload.chatInfo;
        }
    }
});
export const {loadChatInfo, loadChatInfoSuccess} = MessangerContentReducer.actions;
export default MessangerContentReducer.reducer;