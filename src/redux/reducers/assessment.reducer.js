let balanced = {1: 0, 2: 0, 3: 0};
let connection = {9: 0, 10: 0, 11: 0, 12: 0, 13: 0};
let contribution = {14: 0, 15: 0};
let empathy = {16: 0, 17: 0, 18: 0, 19: 0};
let quantitative = {27: 0};
let selfConfidence = {4: 0, 5: 0};
let selfControl = {23: 0, 24: 0, 25: 0, 26: 0};
let selfExpression = {20: 0, 21: 0, 22: 0};
let adaptability = {6: 0, 7: 0, 8: 0};

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


const assessmentReducer = (state = answers, action) => {
    switch(action.type) {
        case 'Balanced': 
            return [...state, answers.balanced = action.payload];
        case 'Connection':
            return [...state, connection = action.payload];
        case 'Contribution':
            return [...state, contribution = action.payload];
        case 'Empathy':
            return [...state, empathy = action.payload];
        case 'Quantitative':
            return [...state, quantitative = action.payload];
        case 'Self-Confidence':
            return [...state, selfConfidence = action.payload];
        case 'Self-Control':
            return [...state, selfControl = action.payload];
        case 'Self-Expression':
            return [...state, selfExpression = action.payload];
        case 'Adaptability':
            return [...state, adaptability = action.payload];
    }  
}