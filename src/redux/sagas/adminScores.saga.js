import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* adminScores() {
    yield takeLatest('FETCH_ALL_SCORES', fetchAllScores)
};

function* fetchAllScores() {
    try {
        const scores = yield axios.get('api/studentCsv')
        yield put({type: 'SET_ALL_SCORES', payload: scores.data})
    } catch(error) {
        console.log('Error grabbing all scores for admin', error);   
    }
}

export default adminScores;
