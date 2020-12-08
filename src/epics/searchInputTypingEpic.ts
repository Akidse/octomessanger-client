import { IUser } from "../app/userReducer";
import { Observable, from, of } from "rxjs";
import { tap, filter, debounceTime, distinctUntilKeyChanged, mergeMap, withLatestFrom, catchError } from "rxjs/operators";
import Axios, { AxiosResponse } from "axios";
import { API_PAGES } from "./api_const";
import { getApiUrl } from "./epicUtils";
import { PayloadAction } from "@reduxjs/toolkit";
import { searchFailure, searchSuccess, searchTextTyping } from "../components/left-bar/LeftBarReducer";
import { StateObservable } from "redux-observable";
import { RootState } from "../app/store";

type SearchRequestResponse = {
    foundUsers: IUser[],
};

const searchUserRequest = (params: any, token: string): Observable<AxiosResponse<SearchRequestResponse>> => from(
    Axios.post<SearchRequestResponse>(
        getApiUrl(API_PAGES.SEARCH_USER),
        params,
        {
            headers: {
                'Authorization': ("Bearer " + token),
            }
        }
    )
);

const SearchInputTypingEpic = (actions$: Observable<PayloadAction<any>>, state$: StateObservable<RootState>) => actions$.pipe(
    filter(searchTextTyping.match),
    debounceTime(500),
    distinctUntilKeyChanged('payload'),
    filter(({payload: searchText}) => searchText),
    withLatestFrom(state$),
    mergeMap(([action, state]) =>
        searchUserRequest(action.payload, state.user.token as string).pipe(
            mergeMap((response) => of(
                searchSuccess({foundUsers: response.data.foundUsers})
            )),
            catchError((err) => of(searchFailure(err)))
        )
    )
);

export default SearchInputTypingEpic;