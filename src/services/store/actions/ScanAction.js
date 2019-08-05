import { toastr } from 'react-redux-toastr';
import ScanRepository from "../../repositories/ScanRepository";
import {
    SCAN_LIST_REQUEST, 
    SCAN_LIST, 
    SCAN_LIST_FAILED, 
    SCAN_LIST_UPDATE, 
    SCAN_EDIT, 
    SCAN_CREATE, 
    SCAN_UPDATE, 
    SCAN_SAVING,
    SCAN_SAVE,
    SCAN_EDIT_UNMOUNT
} from "./types/ScanTypes";

export const LOCAL_SCAN_LIST = localStorage.getItem('scans');

export const scanListRequest = () => ({
    type: SCAN_LIST_REQUEST
});

export const scanList = (data) => ({
    type: SCAN_LIST,
    payload: data
});

export const scanListFailed = () => ({
    type: SCAN_LIST_FAILED
});

export const scanListUpdate = (data) => ({
    type: SCAN_LIST_UPDATE,
    payload: data
});

export const scanEdit = (data) => ({
    type: SCAN_EDIT,
    payload: data
});

export const scanEditUnmount = () => ({
    type: SCAN_EDIT_UNMOUNT
})

export const scanCreate = () => ({
    type: SCAN_CREATE
});

export const scanUpdate = (data) => ({
    type: SCAN_UPDATE,
    payload: { data: data }
});

export const scanSaving = () => ({
    type: SCAN_SAVING
});

export const scanSave = (data) => ({
    type: SCAN_SAVE,
    payload: data
});

export const getScanList = (data) => dispatch => {
    dispatch(scanListRequest());
    if (!LOCAL_SCAN_LIST) {
        localStorage.setItem('scans', JSON.stringify(data));
        dispatch(scanList(data));
    } else {
        dispatch(scanList(JSON.parse(LOCAL_SCAN_LIST)));
    }
}

export const updateScanList = (data) => dispatch => {
    dispatch(scanListUpdate(data));
}

export const onScanEdit = (id) => dispatch => {
    let scansData = ScanRepository.getScanWithUserData(),
        scan = {};

    if (LOCAL_SCAN_LIST)
        scansData = JSON.parse(LOCAL_SCAN_LIST)

    scan = scansData.find(scan => scan.id === parseInt(id));

    dispatch(scanEdit({id: id, data: scan}));
}

export const onSaveScan = (data) => dispatch => {
    dispatch(scanSaving());
    setTimeout(() => {
        localStorage.setItem('scans', JSON.stringify(data));
        dispatch(scanSave(data))
        toastr.success("SUCCESS", "Record saved successfully!");
    }, 1500);
}