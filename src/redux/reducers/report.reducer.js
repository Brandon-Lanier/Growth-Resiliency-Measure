
// When an admin selects a report to generate, the data will be stored here
const reportReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_REPORT':
            return action.payload;
        default:
            return state;
    }
};

export default reportReducer;