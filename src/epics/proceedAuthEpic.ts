import Axios, { AxiosResponse } from "axios";
import { API_PAGES } from "./api_const";
import { getApiUrl } from "./epicUtils";
import { Observable, from, of } from "rxjs";
import { mergeMap, map, catchError, filter, tap } from "rxjs/operators";
import { PayloadAction } from "@reduxjs/toolkit";
import { authFailed, AuthPageSubmitFormAction, authSuccess, submitForm } from "../components/auth/AuthPageReducer";
import { authorizeUser, IUser } from "../app/userReducer";
import { push } from "connected-react-router";

type authRequestResponse = {
    accessToken: string,
    user: IUser,
};

const authRequest = (params: AuthPageSubmitFormAction): Observable<AxiosResponse<authRequestResponse>> => from(
    Axios.post<authRequestResponse>(
        getApiUrl(API_PAGES.AUTH),
        params
    )
);

const proceedAuthEpic = (actions$: Observable<PayloadAction<AuthPageSubmitFormAction>>) => actions$.pipe(
    filter(submitForm.match),
    mergeMap((action) =>
        authRequest(action.payload).pipe(
            mergeMap((response) => of(
                authSuccess({}),
                authorizeUser({
                    token: response.data.accessToken,
                    user: response.data.user,
                }),
                push("/")
            )),
            catchError((err) => of(authFailed(err)))
        )
    )
);

export default proceedAuthEpic;