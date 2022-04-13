import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// Posting assessment answers to the database
function* fetchBatch() {
    try {
        const batch = yield axios.get(`/cohort`);
        // update batch reducer to null
        // this will make the homepage conditionally render correctly for the student
        if(batch !== 'none') {
            yield put({type: 'SET_BATCH', payload: Number(batch)})
        }
    } catch(error) {
        console.log('Saga failed to post scores', error);
    }
}

function* fetchBatchSaga() {
    yield takeLatest('FETCH_BATCH', fetchBatch);
};

export default fetchBatchSaga;