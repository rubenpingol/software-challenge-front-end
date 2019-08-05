import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import scans from './ScanReducer';
import users from './UserReducer';

const rootReducer = combineReducers({
    routing: routerReducer,
    toastr: toastrReducer,
    scans,
    users
});

export default rootReducer;