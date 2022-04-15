import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// pull active batch id for student if assessment is available
function* fetchBatch() {
    try {
        const batch = yield axios.get(`/api/admin/cohort/studentbatch`);
        yield console.log('batch is', batch)
        // if assessment is available, send batch id to reducer
        if(batch.data !== 'none') {
            yield put({type: 'SET_BATCH', payload: batch.data})
        }
    } catch(error) {
        console.log('Saga failed to grab assessment batch id', error);
    }
}

// This will grab the assessment batches for admins
function* fetchAdminBatch() {
    try {
        const batch = yield axios.get(`/assessment`);
        yield put({type: 'SET_ADMIN_BATCH', payload: batch.data})
    } catch(error) {
        console.log('Failed to get admin batches in fetchBatch saga', error);
    }
}

// This grabs the active batch for admins and pulls back all the students that have completed the assessment
function* fetchAdminActiveBatch() {
    try {
        const batch = yield axios.get(`/assessment/adminbatch`)
        if (batch !== []) {
            yield put({type: 'SET_ADMIN_ACTIVE_BATCH', payload: batch.data})
        }
    } catch (error) {
        console.log('Failed to grab the active admin batch ins fetchBatch saga', error);
    }
}


function* fetchBatchSaga() {
    yield takeLatest('FETCH_BATCH', fetchBatch);
    yield takeLatest('FETCH_ADMIN_ACTIVE_BATCH', fetchAdminActiveBatch);
    yield takeLatest('FETCH_ADMIN_BATCH', fetchAdminBatch)
};

export default fetchBatchSaga;