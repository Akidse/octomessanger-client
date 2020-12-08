import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
    _id: string,
    id: string,
    nickname: string,
};

export interface IUserReducerState {
    isLogged: boolean,
    isLoading: boolean,
    user: IUser | null,
    token: string | null,
};

const initialState: IUserReducerState = {
    isLogged: false,
    isLoading: true,
    user: null,
    token: null,
};

export type AuthorizeUserActionPayload = {
    user: IUser,
    token: string,
};

export type GetUserSuccessActionPayload = {
    user: IUser,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        retrieveTokenFromLS: (state, action) => {
            state.isLoading = true;
        },
        setToken: (state, action) => {
            state.token = action.payload.token;
        },
        noToken: (state, action) => {
            state.isLoading = false;
            state.isLogged = false;
            state.token = null;
            state.user = null;
        },
        getUserInfo: (state, action) => {
            state.isLoading = true;
        },
        getUserInfoSuccess: (state, action: PayloadAction<GetUserSuccessActionPayload>) => {
            state.user = action.payload.user;
            state.isLoading = false;
            state.isLogged = true;
        },
        getUserInfoFailed: (state, action) => {
            state.isLoading = false;
        },
        authorizeUser: (state, action: PayloadAction<AuthorizeUserActionPayload>) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoading = false;
            state.isLogged = true;
            localStorage.setItem("OCTOMESSANGER_API_TOKEN", action.payload.token);
        },
        logout: (state, action) => {
            state.user = null;
            state.token = null;
            state.isLogged = false;
            state.isLoading = false;
            localStorage.removeItem("OCTOMESSANGER_API_TOKEN");
        }
    },
});

export const { retrieveTokenFromLS, noToken, getUserInfo, authorizeUser, getUserInfoSuccess, getUserInfoFailed, logout, setToken } = userSlice.actions;
export default userSlice.reducer;