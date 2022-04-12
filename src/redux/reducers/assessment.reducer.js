
// setting the default state for each category.  The keys here are the id of each question.
let balanced = {1: 0, 2: 0, 3: 0};
let connection = {9: 0, 10: 0, 11: 0, 12: 0, 13: 0};
let contribution = {14: 0, 15: 0};
let empathy = {16: 0, 17: 0, 18: 0, 19: 0};
let quantitative = {27: 0};
let selfConfidence = {4: 0, 5: 0};
let selfControl = {23: 0, 24: 0, 25: 0, 26: 0};
let selfExpression = {20: 0, 21: 0, 22: 0};
let adaptability = {6: 0, 7: 0, 8: 0};


// array that stores all the categories.  This is our default state in the reducer.
let answers = [
   balanced,
   connection,
   contribution,
   empathy,
   quantitative,
   selfConfidence,
   selfControl,
   selfExpression,
   adaptability
];


// Reducer will keep current state of the array and replace each categories object based on what is sent from the assessment.
const assessmentReducer = (state = answers, action) => {
    switch(action.type) {
        case 'ADD_BALANCED': 
            return [...state, answers.balanced = action.payload];
        case 'ADD_CONNECTION':
            return [...state, connection = action.payload];
        case 'ADD_CONTRIBUTION':
            return [...state, contribution = action.payload];
        case 'ADD_EMPATHY':
            return [...state, empathy = action.payload];
        case 'ADD_QUANTITATIVE':
            return [...state, quantitative = action.payload];
        case 'ADD_CONFIDENCE':
            return [...state, selfConfidence = action.payload];
        case 'ADD_CONTROL':
            return [...state, selfControl = action.payload];
        case 'ADD_EXPRESSION':
            return [...state, selfExpression = action.payload];
        case 'ADD_ADAPTABILITY':
            return [...state, adaptability = action.payload];
        default:
            return state;
    }  
}

export default assessmentReducer;