import React, { useEffect, useState } from "react";

import "./userAvatar.scss";

function getColorBasedOnLetter(char: string) {
    let alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
    let index = alphabet.indexOf(char.toLowerCase());
    if(index == -1)
        return '#2F2B43';

    if(index < 5)
        return '#CB4F87';
    else if(index < 10)
        return '#DD5F56';
    else if(index < 15)
        return '#DD9156';
    else if(index < 20)
        return '#6A4BC2';
    else if(index < 25)
        return '#4B6FC2';
    else
        return '#4BC265';
}
export const UserAvatar: React.FC<{nickname: string, size: number}> = ({nickname, size}) => {
    const [acronym, setAcronym] = useState('US');
    const [bgColor, setBgColor] = useState('#2F2B43');

    useEffect(() => {
        if(!nickname)
            return;
        let acronym = "";
        nickname.split(' ').forEach((str, index) => {
            acronym += str[0];
            if(index > 1)
                return;
        });

        setAcronym(acronym.toUpperCase());
        setBgColor(getColorBasedOnLetter(acronym[0]));
    }, [nickname]);
    return (
        <div
            className="user-avatar"
            style={{backgroundColor: bgColor, height: size+"px", width: size+"px"}}
        >
            {acronym}
        </div>
    );
};