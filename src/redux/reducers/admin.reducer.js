// Reducer will hold the array of admin users for superadmin page 


/// NOT CURRENTLY USED == MAYBE DELETE
const admins = (state = [], action) => {
    switch(action.type) {
        case 'SET_ADMINS': 
            return action.payload;
        default:
            return state;
    }  
}

export default admins;