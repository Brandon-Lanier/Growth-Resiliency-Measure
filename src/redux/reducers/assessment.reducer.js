
// Reducer will keep current state of the array and replace each categories object based on what is sent from the assessment.
const assessmentReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_BALANCE': 
            return [...state, action.payload];
        case 'SET_CONFIDENCE':
            return [...state, action.payload];
        case 'SET_ADAPTABILITY':
            return [...state, action.payload];
        case 'SET_CONNECTION':
            return [...state, action.payload];
        case 'SET_CONTRIBUTION':
            return [...state, action.payload];
        case 'SET_EMPATHY':
            return [...state, action.payload];
        case 'SET_EXPRESSION':
            return [...state, action.payload];
        case 'SET_CONTROL':
            return [...state, action.payload];
        case 'SET_QUALITATIVE':
            return [...state, action.payload];
        default:
            return state;
    }  
}

// Reducer will hold the batch id for students if active assessment is available
const batch = (state = null, action) => {
    switch(action.type) {
        case 'SET_BATCH': 
            return action.payload;
        case 'EMPTY_BATCH':
            return null
        default:
            return state;
    }  
}

export default combineReducers({
    assessmentReducer,
    batch
  });