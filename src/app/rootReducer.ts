import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import userReducer from "./userReducer";
import authPageReducer from "../components/auth/AuthPageReducer";
import LeftBarReducer from "../components/left-bar/LeftBarReducer";
import MessangerReducer from "../components/messanger/MessangerReducer";
import RightBarReducer from "../components/right-bar/RightBarReducer";

const createRootReducer = (history: History) => combineReducers({
    router: connectRouter(history),
    user: userReducer,
    authPage: authPageReducer,
    leftbar: LeftBarReducer,
    messanger: MessangerReducer,
    rightbar: RightBarReducer,
    //other reducers
});

export default createRootReducer;