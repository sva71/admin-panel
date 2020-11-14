import {combineReducers} from "redux";

import groupsReducer from './groups';
import newsReducer from "./news";
import navigationReducer from './navigation';
import settingsReducer from "./settings";

const reducer = combineReducers({
    groups: groupsReducer,
    news: newsReducer,
    navigation: navigationReducer,
    settings: settingsReducer
});

export default reducer;