
// This stores the URL path so we can change the display of the page title in header

const pathReducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_DASHBOARD_PATH':
            return 'Dashboard';
        case 'SET_STUDENT_PATH':
            return "Students";
        case 'SET_ASSESS_PATH':
            return "Assessments";
        case 'SET_EXPORT_PATH':
            return "Data Export";
        case 'SET_SCHOOL_PATH':
            return "Schools";
        case 'SET_SUPERADMIN_PATH':
            return "Administrative";
        case 'CLEAR_PATH':
            return '';
        default:
            return state;
    }
};

export default pathReducer;