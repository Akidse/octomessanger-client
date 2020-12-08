import { combineEpics } from 'redux-observable';
import authEpic from './authEpic';
import getUserInfoEpic from './getUserEpic';
import proceedAuthEpic from './proceedAuthEpic';
import SearchInputTypingEpic from './searchInputTypingEpic';
import SendMessageEpic from './sendMessageEpic';

export const rootEpic = combineEpics(
    authEpic,
    proceedAuthEpic,
    getUserInfoEpic,
    SearchInputTypingEpic,
    SendMessageEpic,
);