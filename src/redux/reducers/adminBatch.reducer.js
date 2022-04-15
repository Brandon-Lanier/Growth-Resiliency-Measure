import { combineReducers } from "redux";

// Reducer will hold the admin active batch if available.
const activeAdminBatch = (state = [], action) => {
    switch(action.type) {
        case 'SET_ADMIN_ACTIVE_BATCH': 
            return action.payload;
        case 'EMPTY_ADMIN_ACTIVE_BATCH':
            return ''
        default:
            return state;
    }  
}

const adminBatches = (state = [], action) => {
    switch(action.type) {
        case 'SET_ADMIN_BATCH':
            return action.payload;
        case 'EMPTY_ADMIN_BATCH':
            return []
    }
}

const adminBatch = combineReducers({
    activeAdminBatch,
    adminBatches
})

export default adminBatch;