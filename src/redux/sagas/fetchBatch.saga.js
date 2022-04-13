import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// pull active batch id for student if assessment is available
function* fetchBatch() {
    try {
        const batch = yield axios.get(`/cohort`);
        // if assessment is available, send batch id to reducer
        if(batch !== 'none') {
            yield put({type: 'SET_BATCH', payload: Number(batch)})
        }
    } catch(error) {
        console.log('Saga failed to grab assessment batch id', error);
    }
}

function* fetchBatchSaga() {
    yield takeLatest('FETCH_BATCH', fetchBatch);
};

export default fetchBatchSaga;