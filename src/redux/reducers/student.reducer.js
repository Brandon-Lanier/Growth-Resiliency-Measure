import { combineReducers } from 'redux';

const studentReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_STUDENTS':
            return action.payload;
        default:
            return state;
    }
}

const studentDetailsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload;
        default:
            return state;
    }
}
// hold only the single student object being edited
const editStudent = (state  = {}, action) => {
    if (action.type === 'SET_EDIT_STUDENT'){
        return action.payload;
    }
    if (action.type === 'EDIT_ONCHANGE') {
        return {
            ...state,
            [action.payload.property]: action.payload.value
        }
    }
    if (action.type ==='EDIT_CLEAR') {
        return {}; 
    }
    return state;
}
export default combineReducers({
    studentReducer,
    studentDetailsReducer,
    editStudent,
  });
  
