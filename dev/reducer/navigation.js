const navigation = [
    {
        name: 'Группы',
        link: '/groups'
    }
];

const navigationReducer = (state = navigation, action) => {

    switch (action.type) {
        case 'UPDATE_NAVIGATION':
            return action.payload
        default: return state
    }

}

export default navigationReducer;