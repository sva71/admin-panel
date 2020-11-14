const news = [];

const newsReducer = (state = news, action) => {
    switch (action.type) {
        case 'SET_NEWS': return action.payload
        case 'DELETE_NEWS': return state.filter((item) => item.id !== action.payload)
        default: return state
    }
}

export default newsReducer;