import React, { MouseEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { LoadingSpinner } from "../../containers/loadingSpinner/LoadingSpinner";

import "./Auth.scss";
import { focusForm, submitForm } from "./AuthPageReducer";

export const Auth: React.FC = (props) => {
    const dispatch = useDispatch();
    const {isLoading, error} = useSelector((state: RootState) => state.authPage);

    const [nicknameInputValue, setNicknameInputValue] = useState('');
    const [passwordInputValue, setPasswordInputValue] = useState('');
    const [humanizedError, setHumanizedError] = useState('');
    const submit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(!nicknameInputValue || !passwordInputValue)
            return;

        dispatch(submitForm({
            nickname: nicknameInputValue,
            password: passwordInputValue,
        }));
    };

    useEffect(() => {
        if(!error)
            return;
        if(error == "WRONG_PASSWORD")
            setHumanizedError('Wrong password, try again');
        else
            setHumanizedError('Server error. Try again later');
    }, [error]);

    const onFocusForm = () => {
        setHumanizedError('');
        dispatch(focusForm({}));
    }

    return (
        <div className="auth-container">
            <div className="auth-wrp">
                <div className="title">Authorization</div>
                {humanizedError && (<div className="error">{humanizedError}</div>)}
                <form>
                    <div>
                        <div className="label">Nickname:</div>
                        <input type="text" name="nickname"
                            onFocus={() => onFocusForm()}
                            onChange={(e) => setNicknameInputValue(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <div className="label">Password:</div>
                        <input type="password" name="password"
                            onFocus={() => onFocusForm()}
                            onChange={(e) => setPasswordInputValue(e.target.value)}
                        ></input>
                    </div>
                    <div className="actions">
                        <button type="submit" onClick={(e) => submit(e)}>
                            {!isLoading && <>Enter messanger</>}
                            {isLoading && <LoadingSpinner/>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}