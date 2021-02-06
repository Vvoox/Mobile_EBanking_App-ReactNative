import { combineReducers } from 'redux';
import {clientReducer} from "./clients-reducer";
import {crenciersReducer} from "./creancier-reducer";
import {comptesReducer} from "./comptes-reducer";

const rootReducer = combineReducers({
    client: clientReducer,
    // compte : comptesReducer,
    creancier : crenciersReducer
});

export default rootReducer;
