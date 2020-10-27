import {combineReducers} from "redux";

import groupsReducer from './groups';
import usersReducer from './users';
import navigationReducer from './navigation';
import settingsReducer from "./settings";

const reducer = combineReducers({
    groups: groupsReducer,
    users: usersReducer,
    navigation: navigationReducer,
    settings: settingsReducer
});

export default reducer;