// Reducer will hold the batch id for students if active assessment is available
const batch = (state = '', action) => {
    switch(action.type) {
        case 'SET_BATCH': 
            return action.payload;
        case 'EMPTY_BATCH':
            return ''
        default:
            return state;
    }  
}

export default batch;