const navigation = [
    {
        name: 'Группы',
        link: '/'
    }
];

const navigationReducer = (state = navigation, action) => {

    const {navigation} = state;

    switch (action.type) {
        case 'UPDATE_NAVIGATION':
            return action.payload
        default: return state
    }

}

export default navigationReducer;