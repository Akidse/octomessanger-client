import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthPageReducerState = {
    isLoading: boolean,
    error: string | null,
};

export type AuthPageSubmitFormAction = {
    nickname: string,
    password: string,
};

const initialState: AuthPageReducerState = {
    isLoading: false,
    error: null,
};

const authPageReducer = createSlice({
    name: 'authPage',
    initialState,
    reducers: {
        submitForm: (state, action: PayloadAction<AuthPageSubmitFormAction>) => {
            state.isLoading = true;
            state.error = null;
        },
        authSuccess: (state, action) => {
            state.isLoading = false;
        },
        authFailed: (state, action) => {
            state.isLoading = false;
            state.error = action?.payload?.err || 'UNDEFINED_ERROR';
        },
        focusForm: (state, action) => {
            state.error = null;
        }
    }
});

export const {submitForm, authSuccess, focusForm, authFailed} = authPageReducer.actions;

export default authPageReducer.reducer;