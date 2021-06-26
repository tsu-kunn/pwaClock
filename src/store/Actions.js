export const Actions = {
    setDateHistory(d) {
        return {
            type: "SET_DATE_HISTORY",
            date: d,
        };
    },
    setHour24(f) {
        return {
            type: "SET_HOUR24",
            flag: f,
        };
    },
    setMsgFlg(f) {
        return {
            type: "SET_MSGFLG",
            flag: f,
        };
    },
    changeImage() {
        return { type: "CHANGE_IMAGE" };
    },
    setReactMsg(m) {
        return {
            type: "SET_REACTMSG",
            msg: m,
        };
    },
    setApptimeStyle(s) {
        return {
            type: "SET_APPTIME_STYLE",
            style: s,
        };
    }
}
