import { Observable } from 'rxjs';
import { Action } from "redux";
import {filter, map, withLatestFrom} from "rxjs/operators";
import { addMessageStub, sendMessage } from '../components/messanger/MessangerReducer';
import { StateObservable } from 'redux-observable';
import { RootState } from '../app/store';


const SendMessageEpic = (actions$: Observable<Action>, state$: StateObservable<RootState>) => actions$.pipe(
    filter(sendMessage.match),
    withLatestFrom(state$),
    map(([action, state]) => {
        let randomId = Math.random().toString(36).substring(7);

        state.messanger.socket?.emit('send_message', {
            message: action.payload.message,
            chatId: action.payload.chatId,
            receiverId: action.payload.receiverId,
            psevdoId: randomId,
        });

        return addMessageStub({
            message: action.payload.message,
            ownerId: state.user.user?._id,
            psevdoId: randomId,
            chatId: action.payload.chatId,
        });
    }),
);

export default SendMessageEpic;