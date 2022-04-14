
//stores a single student average scores sorted by category and batch id
const scoresReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_STUDENT_SCORES':
            return action.payload;
        default:
            return state;
    }
};

export default scoresReducer;