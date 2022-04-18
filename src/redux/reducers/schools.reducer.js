

// Stores the schools list on admin login
const schoolsReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_ALL_SCHOOLS':
            return action.payload;
        default:
            return state;
    }
};

export default schoolsReducer;