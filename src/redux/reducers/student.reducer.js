import { combineReducers } from 'redux';

const studentReducer = (state = [], action) => {
    console.log (action.payload)
    switch (action.type) {
        case 'SET_STUDENTS':
            return action.payload;
        default:
            return state;
    }
}

const studentDetailsReducer = (state = [], action) => {
    console.log (action.payload)
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

export default combineReducers({
    studentReducer,
    studentDetailsReducer,
  });
  
