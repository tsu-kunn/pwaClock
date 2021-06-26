import { createStore } from "redux";

const initialState = {
    dateHistory: null,
    hour24: true,
    msgFlg: true,
    imgFlg: 1,
    reactMsg: null,
    apptimeStyle: { backgroundColor: "#8490c8" },
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DATE_HISTORY":
            return {
                ...state,
                dateHistory: action.date,
            };
        case "SET_HOUR24":
            return {
                ...state,
                hour24: action.flag,
            };
        case "SET_MSGFLG":
            return {
                ...state,
                msgFlg: action.flag,
            };
        case "CHANGE_IMAGE":
            return {
                ...state,
                imgFlg: state.imgFlg ^ 1,
            };
        case "SET_REACTMSG":
            return {
                ...state,
                reactMsg: action.msg,
            };
        case "SET_APPTIME_STYLE":
            return {
                ...state,
                apptimeStyle: action.style,
            };
        default:
            return state;
    }
};

const store = createStore(reducer);


export default store;
