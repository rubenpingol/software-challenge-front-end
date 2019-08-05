import {
    SCAN_LIST,
    SCAN_LIST_REQUEST,
    SCAN_LIST_FAILED,
    SCAN_EDIT,
    SCAN_CREATE,
    SCAN_UPDATE,
    SCAN_LIST_UPDATE,
    SCAN_SAVE,
    SCAN_SAVING,
    SCAN_EDIT_UNMOUNT
  } from "../actions/types/ScanTypes";
  
  const initialState = {
    list: {
      data: [],
      is_requesting: false
    },
    is_saving: false,
    selected_id: null,
    selected: {
      id: null,
      name: null,
      elevationMin: null,
      elevationMax: null,
      scannedByUserId: null
    }
  };
  
  function ScanReducer(state = initialState, action) {
    switch (action.type) {
      case SCAN_LIST_REQUEST:
        return {
          ...state,
          list: {
            ...state.list,
            is_requesting: true
          }
        };
      case SCAN_LIST:
        return {
          ...state,
          list: {
            ...state.list,
            data: [...action.payload],
            is_requesting: false
          }
        };
      case SCAN_LIST_FAILED:
        return {
          ...state,
          list: { ...initialState.list }
        };
      case SCAN_LIST_UPDATE:
        return {
          ...state,
          list: {
            ...state.list,
            data: [...action.payload]
          }
        };
      case SCAN_CREATE:
        return {
          ...state,
          selected_id: null,
          selected: { ...initialState.selected }
        }
      case SCAN_EDIT:
        return {
          ...state,
          selected_id: action.payload.id,
          selected: action.payload.data
        }
      case SCAN_EDIT_UNMOUNT:
        return {
          ...state,
          selected_id: null,
          selected: { ...initialState.selected }
        }
      case SCAN_UPDATE:
        return {
          ...state,
          selected: { ...action.payload.data }
        }
      case SCAN_SAVING:
        return {
          ...state,
          is_saving: true,
        }
      case SCAN_SAVE:
        return {
          ...state,
          is_saving: false,
          list: {
            ...state.list,
            data: action.payload
          }
        }
      default:
        return state;
    }
  }
  
  export default ScanReducer;
  