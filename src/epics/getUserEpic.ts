import { getUserInfo, getUserInfoSuccess, IUser, getUserInfoFailed, logout } from "../app/userReducer";
import { Observable, from, of } from "rxjs";
import { filter, mergeMap, withLatestFrom, catchError } from "rxjs/operators";

import Axios, { AxiosResponse } from "axios";
import { API_PAGES } from "./api_const";
import { getApiUrl } from "./epicUtils";
import { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { StateObservable } from "redux-observable";
import { push } from "connected-react-router";

const getUserInfoRequest = (token: string): Observable<AxiosResponse<IUser>> => from(
    Axios.get<IUser>(
        getApiUrl(API_PAGES.GET_USER),
        {
            headers: {
                'Authorization': ("Bearer " + token),
            }
        }
    )
);

const getUserInfoEpic = (actions$: Observable<PayloadAction>, state$: StateObservable<RootState>) => actions$.pipe(
    filter(getUserInfo.match),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
        return getUserInfoRequest(state.user.token as string).pipe(
            mergeMap((response) => of(getUserInfoSuccess({user: response.data}), push("/"))),
            catchError((err) => of(getUserInfoFailed(err), logout({})))
        );
    }
    )
);

export default getUserInfoEpic;