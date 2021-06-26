import React, { useEffect, useState, useMemo } from 'react';
import './App.css';
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "./store/Actions";

import pic1 from "./image/amiya.png";
import pic2 from "./image/W_05.png";

import message from "./message.json";
import reactmsg from "./reactmsg.json";


function Clock(props) {
    const [date, setDate] = useState(new Date());
    const hour24 = useSelector((state) => state.hour24);
    const dispatch = useDispatch();

    useEffect(() => {
        const timerID = setInterval(() => { setDate(new Date()); }, 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    function clickEvent() {
        dispatch(Actions.setDateHistory(date));
        dispatch(Actions.changeImage());
    }

    // 時刻表示
    // 日にち+曜日
    let opts = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    let localDate = new Intl.DateTimeFormat("ja-JP", opts).format(date);

    // 時間
    let hours = date.getHours();
    let minites = date.getMinutes();
    let seconds = date.getSeconds();
    let ampm = null;

    if (!hour24) {
        ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12;
    }
    minites = minites < 10 ? "0" + minites : minites;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // let localTime = ampm + hours + ":" + minites + ":" + seconds;
    let localTime = hours + ":" + minites;

    return (
        <div>
            <p className="date" onClick={clickEvent}>
                {localDate}
            </p>
            <div className="clock" onClick={clickEvent}>
                <div className="ampm">
                    {ampm}
                </div>
                <div className="time">
                    {localTime}
                </div>
                <div className="seconds">
                    {seconds}
                </div>
            </div>
            {/* <p className="clock" onClick={() => props.onClick(date)}>
                {date.toLocaleTimeString("ja-JP", { hour12: false })}
            </p> */}
        </div>
    );
}

function DateLabel(props) {
    const date = useSelector((state) => state.dateHistory);

    // props.date が更新された場合のみ実行するように変更
    const lblStr = useMemo(() => {
        if (date != null) {
            let opts = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
            let localDate = new Intl.DateTimeFormat("ja-JP", opts).format(date);
            let localTime = date.toLocaleTimeString("ja-JP");

            return (localDate + " " + localTime);
        } else {
            return ("----年--月--日―曜日 --:--:--");
        }
    }, [date]);

    return (
        <label>{lblStr}</label>
    );
}

// srcに配置した場合は import を使うのが一般的らしい
function PictureChange(props) {
    const [timerID, setTimerID] = useState(null);
    const imgFlg = useSelector((state) => state.imgFlg);
    const msgFlg = useSelector((state) => state.msgFlg);
    const dispatch = useDispatch();

    function dialogue() {
        if (timerID != null) {
            clearTimeout(timerID);
        }

        if (msgFlg) {
            dispatch(Actions.setReactMsg(reactmsg.list[Math.floor(Math.random() * reactmsg.list.length)]));
            setTimerID(setTimeout(() => { dispatch(Actions.setReactMsg(null)) }, 3000));
        } else {
            dispatch(Actions.setReactMsg(null));
            setTimerID(null);
        }
    }

    // const pic1 = "/pict/amiya.png";
    // const pic2 = "/pict/W_05.png";
    let picPath = imgFlg ? pic1 : pic2;

    return (
        <img src={picPath} alt="絵" className="chara-img" onClick={dialogue} />
    );

    // public に配置した場合は `${process.env.PUBLIC_URL}` を使う
    // return (
    //     <img src={`${process.env.PUBLIC_URL}` + picPath} alt="絵" width="320" height="320" />
    // );
}

// トグルボタン
function SettingButton(props) {
    const dispatch = useDispatch();

    function changeMessage(e) {
        dispatch(Actions.setMsgFlg(e.target.checked));
    }

    function changeHoure(e) {
        dispatch(Actions.setHour24(e.target.checked));
    }

    return (
        <React.Fragment>
            <div className="item-frame">
                <input type='checkbox' id='setting_item_1' className="checkbox" defaultChecked onChange={changeMessage} />
                <label className="switch" htmlFor='setting_item_1'></label>
                <label className="text" htmlFor='setting_item_1'>つぶやき表示</label>
            </div>
            <div className="item-frame" >
                <input type='checkbox' id='setting_item_2' className="checkbox" defaultChecked onChange={changeHoure} />
                <label className="switch" htmlFor='setting_item_2'></label>
                <label className="text" htmlFor='setting_item_2'>24時間表示</label>
            </div>
        </React.Fragment>
    );
}


function Message(props) {
    const [msg, setMsg] = useState(null);
    const msgFlg = useSelector((state) => state.msgFlg);
    const reactMsg = useSelector((state) => state.reactMsg);

    function selectMsg() {
        if (msg === null && msgFlg) {
            const date = new Date();
            const msgList = date.getHours() >= 12 ? message.PM : message.AM;
            setMsg(msgList[Math.floor(Math.random() * msgList.length)]);
        } else {
            setMsg(null);
        }
    }

    useEffect(() => {
        const timerID = setInterval(selectMsg, 3000);

        return () => {
            clearInterval(timerID);
        };
    });

    let msgPadd = msg === null ? 'rgba(222, 219, 202, 0.0)' : 'rgba(222, 219, 202, 0.85)';
    let rmsgPadd = reactMsg === null ? 'rgba(222, 219, 202, 0.0)' : 'rgba(222, 219, 202, 0.85)';

    return (
        <React.Fragment>
            <div className="message" style={{ backgroundColor: msgPadd }}>
                <label>{msg}</label>
            </div>
            <div className="react-message" style={{ backgroundColor: rmsgPadd }}>
                <label>{reactMsg}</label>
            </div>
        </React.Fragment>
    );
}


function AppClock() {
    const apptimeStyle = useSelector((state) => state.apptimeStyle);

    // function changeApptimeStyle(bgColor) {
    //     let chgStyle = {
    //         backgroundColor: bgColor
    //     }
    //     dispatch(Actions.setApptimeStyle(chgStyle));
    // }

    return (
        <div className="app-main">
            <div className="app-time" style={apptimeStyle}>
                <PictureChange />
                <div className="app-clock">
                    <Clock />
                    <DateLabel />
                </div>
                <div className="app-message">
                    <Message />
                </div>
                <div className="app-button">
                    <SettingButton />
                </div>
            </div>
        </div>
    );
}

export default AppClock;
