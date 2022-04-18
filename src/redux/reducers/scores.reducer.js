<<<<<<< HEAD
import { combineReducers } from "redux";
=======
import { combineReducers } from 'redux';

>>>>>>> master

//stores a single student average scores sorted by category and batch id
const studentScore = (state = [], action) => {
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


<<<<<<< HEAD
const adminAllScores = (state =[], action) => {
    switch(action.type) {
        case 'SET_ALL_SCORES':
            return action.payload;
        default:
            return state;
    }
}


const scoresReducer = combineReducers({
    studentScore,
    adminAllScores
});

export default scoresReducer;
=======
export default combineReducers({
    scoresReducer,
    indScoresReducer,
  });
>>>>>>> master
