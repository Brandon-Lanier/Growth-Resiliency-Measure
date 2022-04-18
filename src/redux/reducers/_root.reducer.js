import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import assessment from './assessment.reducer';
import questions from './questions.reducer'
import batch from './batch.reducer';
import scores from './scores.reducer';
import studentReducer from './student.reducer';
import adminBatch from './adminBatch.reducer';
import report from './report.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  assessment, //holds assessment answers as they go through
  batch, // holds batch id if active assessment is available for student
  questions,
  scores, // Holds students average scores on an assessment
  studentReducer,
  adminBatch,
  report
});

export default rootReducer;
