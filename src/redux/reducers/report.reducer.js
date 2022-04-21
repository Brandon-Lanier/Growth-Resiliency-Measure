
// When an admin selects a report to generate, the data will be stored here
const reportReducer = (state = [], action) => {
    console.log('action.payload', action.payload);
    switch(action.type) {    
        case 'SET_REPORT':
            return action.payload;
        case 'EMPTY_REPORT':
            return []
        default:
            return state;
    }
};

export default reportReducer;
  