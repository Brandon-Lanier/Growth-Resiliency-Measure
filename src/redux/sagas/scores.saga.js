import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// Posting assessment answers to the database
function* postScores(action) {
    try {
        const answers = action.payload
        yield axios.post(`/scores`, answers);
        // update batch reducer to null
        // this will make the homepage conditionally render correctly for the student
        yield put({type: 'EMPTY_BATCH'})
    } catch(error) {
        console.log('Saga failed to post scores', error);
    }
}

function* postScoresSaga() {
    yield takeLatest('POST_SCORES', postScores)
};

export default postScoresSaga;