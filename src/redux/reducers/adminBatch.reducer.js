import { combineReducers } from "redux";

// Reducer will hold the admin active batch if available. Student Details tied to batch 
const activeAdminBatch = (state = [], action) => {
  switch (action.type) {
    case "SET_ADMIN_ACTIVE_BATCH":
      return action.payload;
    case "EMPTY_ADMIN_ACTIVE_BATCH":
      return "";
    default:
      return state;
  }
};

const adminBatches = (state = [], action) => {
  switch (action.type) {
    case "SET_ADMIN_BATCH":
      return action.payload;
    case "EMPTY_ADMIN_BATCH":
      return [];
    default:
      return state;
  }
};

// Reducer will hold the batch details if active
const activeBatch = (state = [], action) => {
  switch (action.type) {
    case "SET_ACTIVE_BATCH":
      return action.payload;
    case "EMPTY_ADMIN_ACTIVE_BATCH":
      return "";
    default:
      return state;
  }
};


const adminBatch = combineReducers({
  activeAdminBatch,
  activeBatch,
  adminBatches,
});

export default adminBatch;
