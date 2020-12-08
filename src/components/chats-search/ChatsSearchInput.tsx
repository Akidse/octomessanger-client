import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearSearch, searchTextTyping } from "../left-bar/LeftBarReducer";

import "./ChatsSearchInput.scss";
const ChatsSearchInput: React.FC = () => {
    const dispatch = useDispatch();

    const [searchText, setSearchText] = useState('');
    const onInputChange = (val: string) => {
        if(val.length === 0) {
            return clearInput();
        }

        if(val.length >= 3)
            dispatch(searchTextTyping({searchText: val}));

        setSearchText(val);
    }

    const clearInput = () => {
        dispatch(clearSearch({}));
        setSearchText('');
    }

    return (
        <div className="chats-search-input">
            <input type="text" placeholder="Search chatmate" value={searchText || ''} onChange={(e) => onInputChange(e.target.value)}/>
            <div
                className={`clear-icon ${searchText.length ? 'show': 'hide'}`}
                onClick={() => clearInput()}
            >
                <FontAwesomeIcon icon={["fas", "times"]} />
            </div>
        </div>
    );
}

export default ChatsSearchInput;