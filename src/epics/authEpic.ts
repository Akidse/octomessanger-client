import { Observable, of } from 'rxjs';
import { Action } from "redux";
import {filter, mergeMap} from "rxjs/operators";
import { retrieveTokenFromLS, getUserInfo, noToken, setToken } from "../app/userReducer";


const authEpic = (actions$: Observable<Action>) => actions$.pipe(
    filter(retrieveTokenFromLS.match),
    mergeMap((action) => {
        if(localStorage.getItem('OCTOMESSANGER_API_TOKEN'))
            return of(setToken({token: localStorage.getItem('OCTOMESSANGER_API_TOKEN')}), getUserInfo({}));
        else {
            return of(noToken({}));
        }
    })
);

export default authEpic;