let users = [];

const usersReducer = (state = users, action) => {

    const {payload} = action;

    switch (action.type) {
        case 'UPDATE_USERS': return payload
        default: return state
    }

}

export default usersReducer;