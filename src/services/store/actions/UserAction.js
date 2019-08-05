import {
    USER_LIST_REQUEST, 
    USER_LIST, 
    USER_LIST_FAILED
} from "./types/UserTypes";

export const LOCAL_USER_LIST = localStorage.getItem('users');

export const userListRequest = () => ({
    type: USER_LIST_REQUEST
});

export const userList = (data) => ({
    type: USER_LIST,
    payload: data
});

export const userListFailed = () => ({
    type: USER_LIST_FAILED
});

export const getUserList = (data) => dispatch => {
    dispatch(userListRequest());
    if (!LOCAL_USER_LIST) {
        localStorage.setItem('users', JSON.stringify(data));
        dispatch(userList(data));
    } else {
        dispatch(userList(JSON.parse(LOCAL_USER_LIST)));
    }
}