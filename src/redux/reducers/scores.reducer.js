import { combineReducers } from 'redux';


//stores a single student average scores sorted by category and batch id
const scoresReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_STUDENT_SCORES':
            return action.payload;
        default:
            return state;
    }
};
//stores individual scores for admin view 
const indScoresReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_IND_SCORES':
            return action.payload;
        default:
            return state;
    }
};


export default combineReducers({
    scoresReducer,
    indScoresReducer,
  });