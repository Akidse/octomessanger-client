import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { RootState } from "../../app/store";
import { API_CONST } from "../../config";
import LeftBar from "../left-bar/LeftBar";
import { setIsLoading } from "../left-bar/LeftBarReducer";
import MessangerContent from "../messanger-content/MessangerContent";
import RightBar from "../right-bar/RightBat";

import "./Messanger.scss";
import { chatCreationSuccess, loadChatsSuccess, newChatCreated, newMessage, onCompanionChatRead, onSocketConnect, readChatSuccess, sendMessageSuccess, toggleRightPanel } from "./MessangerReducer";

const Messanger: React.FC = () => {
    const dispatch = useDispatch();
    const { token, user } = useSelector((state: RootState) => state.user);
    const {activeUser, activeChat, isRightPanelOpened, isLeftPanelOpened} = useSelector((state: RootState) => state.messanger);

    useEffect(() => {
        const socket = io(API_CONST.sockets_url, {
            query: {
                token: token
            }
        });

        socket.on('connect', () => {
            dispatch(onSocketConnect({socket: socket}));
        });

        socket.on('message_emitted', (res: any) => {
            dispatch(newMessage({...res, userId: user?._id}));
        });

        socket.on('chats', (res: any) => {
            dispatch(loadChatsSuccess({chats: res.chats}));
            dispatch(setIsLoading({state: false}));
        });

        socket.on('message_sent_success', (res: any) => {
            dispatch(sendMessageSuccess(res));
        });

        socket.on('chat_created', (res: any) => {
            console.log("CHAT_CREATED");
            console.log(res);
            dispatch(newChatCreated(res));
        });

        socket.on('receiver_chat_created', (res: any) => {

            dispatch(chatCreationSuccess(res));
        });

        socket.on('read_chat_success', (res: any) => {
            dispatch(readChatSuccess(res));
        });

        socket.on('user_reads_chat', (res: any) => {
            dispatch(onCompanionChatRead(res));
        });

        return () => {
            socket.disconnect();
        }
    }, []);

    const closeRightPanel = (e: React.MouseEvent) => {
        if((e.target as any).className.indexOf('rightbar') != -1)
            dispatch(toggleRightPanel({state: false}));
    };
    return (
        <div className="messanger-container">
            <div className="messanger">
                <div className={`backdrop ${isRightPanelOpened ? 'active' : ''}`}></div>
                <div className={`leftbar ${isLeftPanelOpened ? 'active' : ''}`}>
                    <LeftBar/>
                </div>
                <div className="content">
                    <MessangerContent/>
                </div>
                { ((activeUser || activeChat) && isRightPanelOpened) &&
                    (<div onClick={(e) => closeRightPanel(e)} className={`rightbar ${isRightPanelOpened ? 'active' : ''}`}>
                        <RightBar/>
                    </div>)
                }

            </div>
        </div>
    );
}

export default Messanger;