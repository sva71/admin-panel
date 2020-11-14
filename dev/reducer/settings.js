const defaultSettings = {
    baseURL: 'https://pet-app.ru/api/v1',
    authenticated: false
}

const settingsReducer = (state = defaultSettings, action) => {

    const {payload} = action;

    switch (action.type) {
        case 'SET_AUTHENTICATED': return {
            ...state,
            authenticated: payload
        }
        default: return state

    }

}

export default settingsReducer;