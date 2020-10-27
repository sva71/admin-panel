const settingsReducer = (state, action) => {

    const {payload} = action;

    switch (action.type) {
        case 'SET_AUTHENTICATED': return {
            ...state,
            authenticated: payload
        }
        default: return {
            baseURL: 'http://89.223.94.143:3255/api/v1',
            authenticated: false
        }

    }
}

export default settingsReducer;