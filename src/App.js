import React, { useEffect, useState, useMemo } from 'react';
import './App.css';

import pic1 from "./image/amiya.png";
import pic2 from "./image/W_05.png";

import message from "./message.json";
import reactmsg from "./reactmsg.json";


function Clock(props) {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => { setDate(new Date()); }, 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    function clickEvent() {
        props.onClick(date);
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

    if (!props.hour24) {
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
    // props.date が更新された場合のみ実行するように変更
    const lblStr = useMemo(() => {
        if (props.date != null) {
            let opts = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
            let localDate = new Intl.DateTimeFormat("ja-JP", opts).format(props.date);
            let localTime = props.date.toLocaleTimeString("ja-JP");

            return (localDate + " " + localTime);
        } else {
            return ("----年--月--日―曜日 --:--:--");
        }
    }, [props.date]);

    return (
        <label>{lblStr}</label>
    );
}

// srcに配置した場合は import を使うのが一般的らしい
function PictureChange(props) {
    const [timerID, setTimerID] = useState(null);

    function dialogue() {
        if (timerID != null) {
            clearTimeout(timerID);
        }

        if (props.msgFlg) {
            props.setMsg(reactmsg.list[Math.floor(Math.random() * reactmsg.list.length)]);
            setTimerID(setTimeout(() => { props.setMsg(null); }, 3000));
        } else {
            props.setMsg(null);
            setTimerID(null);
        }
    }

    // const pic1 = "/pict/amiya.png";
    // const pic2 = "/pict/W_05.png";
    let picPath = props.flg ? pic1 : pic2;

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
    function changeMessage(e) {
        props.chgMsgFlg(e.target.checked);
    }

    function changeHoure(e) {
        props.chg24Hour(e.target.checked);
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

    function selectMsg() {
        if (msg === null && props.msgFlg) {
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
    let rmsgPadd = props.reactMsg === null ? 'rgba(222, 219, 202, 0.0)' : 'rgba(222, 219, 202, 0.85)';

    return (
        <React.Fragment>
            <div className="message" style={{ backgroundColor: msgPadd }}>
                <label>{msg}</label>
            </div>
            <div className="react-message" style={{ backgroundColor: rmsgPadd }}>
                <label>{props.reactMsg}</label>
            </div>
        </React.Fragment>
    );
}


class AppClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateHistory: null,
            hour24: true,
            msgFlg: true,
            pictFlag: 1,
            reactMsg: null,
            apptimeStyle: { backgroundColor: "#8490c8" }
        };
    }

    dateClick(d) {
        this.setState({
            dateHistory: d,
            pictFlag: this.state.pictFlag ^ 1,
        });
    }

    change24Hour(f) {
        this.setState({
            hour24: f,
        });
    }

    changeMessageFlag(f) {
        this.setState({
            msgFlg: f,
        });
    }

    reactMessage(m) {
        this.setState({
            reactMsg: m,
        });
    }

    changeApptimeStyle(bgColor) {
        let chgStyle = {
            backgroundColor: bgColor
        }

        this.setState({
            apptimeStyle: chgStyle
        })
    }

    render() {
        return (
            <div className="app-main">
                <div className="app-time" style={this.state.apptimeStyle}>
                    <PictureChange
                        flg={this.state.pictFlag}
                        setMsg={(m) => this.reactMessage(m)}
                        msgFlg={this.state.msgFlg}
                    />
                    <div className="app-clock">
                        <Clock
                            onClick={(d) => this.dateClick(d)}
                            hour24={this.state.hour24}
                        />
                        <DateLabel
                            date={this.state.dateHistory}
                        />
                    </div>
                    <div className="app-message">
                        <Message
                            reactMsg={this.state.reactMsg}
                            msgFlg={this.state.msgFlg}
                        />
                    </div>
                    <div className="app-button">
                        <SettingButton
                            chg24Hour={(f) => this.change24Hour(f)}
                            chgMsgFlg={(f) => this.changeMessageFlag(f)}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


export default AppClock;
