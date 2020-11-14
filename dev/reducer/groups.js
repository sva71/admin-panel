const groups=[];

const groupsReducer = (state = groups, action) => {

    const {payload} = action;

    switch(action.type) {
        case 'SET_GROUPS': return payload
        case 'ADD_GROUP': {
            return [
                ...state,
                payload
            ]
        }
        case 'UPDATE_GROUP': {
            return state.map((item) => item.id === payload.id ? payload : item)
        }
        case 'DELETE_GROUP': return state.filter(({id}) => id !== payload)
        default:
            return state
    }

}

export default groupsReducer;