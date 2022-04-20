import { combineReducers } from "redux";

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

// Holds all scores for all students
const adminAllScores = (state =[], action) => {
    switch(action.type) {
        case 'SET_ALL_SCORES':
            return action.payload;
        default:
            return state;
    }
}

const testDates = (state =[], action) => {
    switch(action.type) {
        case 'SET_TEST_DATES':
            return action.payload;
        default:
            return state;
    }
}
const testTotal = (state =[], action) => {
    switch(action.type) {
        case 'SET_TEST_TOTAL':
            return action.payload;
        default:
            return state;
    }
}

const scoresReducer = combineReducers({
    studentScore,
    adminAllScores,
    indScoresReducer,
    testDates,
    testTotal,
});

export default scoresReducer;
