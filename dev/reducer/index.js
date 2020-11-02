import {combineReducers} from "redux";

import groupsReducer from './groups';
import navigationReducer from './navigation';
import settingsReducer from "./settings";

const reducer = combineReducers({
    groups: groupsReducer,
    navigation: navigationReducer,
    settings: settingsReducer
});

export default reducer;