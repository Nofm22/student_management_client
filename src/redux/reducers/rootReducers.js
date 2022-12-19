import {
    combineReducers,
    applyMiddleware,
    legacy_createStore as createStore,
} from "redux";
import reduxThunk from "redux-thunk";

const rootReducers = combineReducers({});

export const store = createStore(rootReducers, applyMiddleware(reduxThunk));
