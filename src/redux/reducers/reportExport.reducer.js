// the export reducer will contain the same data as the report reducer 
//but with detail per student
const reportExportReducer = (state = [], action) => {
    console.log('action.payload', action.payload);
    switch(action.type) {    
        case 'SET_REPORT_EXPORT':
            return action.payload;
        case 'EMPTY_REPORT':
            return []
        default:
            return state;
    }
};

export default reportExportReducer;