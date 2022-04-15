// Reducer will hold the admin active batch if available.
const adminBatch = (state = [], action) => {
    switch(action.type) {
        case 'SET_ADMIN_BATCH': 
            return action.payload;
        case 'EMPTY_ADMIN_BATCH':
            return ''
        default:
            return state;
    }  
}

export default adminBatch;