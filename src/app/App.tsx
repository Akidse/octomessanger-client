import { ConnectedRouter, push } from "connected-react-router";
import React, { useEffect } from "react";
import {history, RootState} from "./store";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import page404 from "../containers/404page";
import FullSizeInfoContainer from "../containers/fullSizeInfoContainer/fullSizeInfoContainer";
import { retrieveTokenFromLS } from "./userReducer";
import { Auth } from "../components/auth/Auth";
import Messanger from "../components/messanger/Messanger";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faCheckDouble, faPaperPlane, faTimes } from "@fortawesome/free-solid-svg-icons";

library.add(faTimes, faPaperPlane, faCheck, faCheckDouble);

const App: React.FC = () => {
    const dispatch = useDispatch();
    const {isLoading, isLogged} = useSelector(
        (state: RootState) => state.user,
    );

    useEffect(() => {
        dispatch(retrieveTokenFromLS({}));
    }, [dispatch]);

    useEffect(() => {
        if(!isLoading && !isLogged) {
            dispatch(push('/auth'));
        }
    }, [isLoading, isLogged, dispatch]);

    if(!isLoading) {
        return (
            <ConnectedRouter history={history}>
            <>
                <Switch>
                    <Route exact path="/auth" component={Auth}/>
                    <Route exact path="/" component={Messanger} />
                    <Route component={page404} />
                </Switch>
            </>
            </ConnectedRouter>
        );
    } else {
        return (
            <FullSizeInfoContainer text={"Data is loading"} />
        );
    }
}

export default App;