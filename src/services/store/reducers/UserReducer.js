import {
    USER_LIST, 
    USER_LIST_REQUEST, 
    USER_LIST_FAILED
  } from "../actions/types/UserTypes";
  
  const initialState = {
    list: {
      data: [],
      isRequesting: false
    }
  };
  
  function UserReducer(state = initialState, action) {
    switch (action.type) {
      case USER_LIST_REQUEST:
        return {
          ...state,
          list: {
            ...state.list,
            isRequesting: true
          }
        };
      case USER_LIST:
        return {
          ...state,
          list: {
            ...state.list,
            data: [...action.payload],
            isRequesting: false
          }
        };
      case USER_LIST_FAILED:
        return {
          ...state,
          list: { ...initialState }
        };
      default:
        return state;
    }
  }
  
  export default UserReducer;
  