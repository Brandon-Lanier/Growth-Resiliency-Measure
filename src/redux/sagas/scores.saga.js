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

function* fetchStudentScores() {
    try {
        const scores = yield axios.get('/scores')
        yield put({type: 'SET_STUDENT_SCORES', payload: scores.data})
    } catch(error) {
        console.log('Error getting a single student scores in postScoresSaga', error);  
    }
}

function* fetchIndScores(studentId) {
    try {
        const studId = studentId.payload
        console.log ('in fetchIndScores, payload is', studId)
        const indScores = yield axios.get(`/scores/adminStudent/${studId}`);
        yield put({type: 'SET_IND_SCORES', payload: indScores.data})
    } catch(error) {
        console.log('ADMIN Error getting a single student scores in postScoresSaga', error);  
    }
}

function* fetchTestDates(studentId) {
    try {
        const id = studentId.payload
        console.log ('in fetchTestDates, payload is', id)
        const dates = yield axios.get(`/scores/testdates/${id}`);
        yield put({type: 'SET_TEST_DATES', payload: dates.data})
    } catch(error) {
        console.log('ADMIN Error getting a single student scores in postScoresSaga', error);  
    }
}

function* postScoresSaga() {
    yield takeLatest('POST_SCORES', postScores);
    yield takeLatest('FETCH_STUDENT_SCORES', fetchStudentScores);
    yield takeLatest('FETCH_IND_SCORES', fetchIndScores);
    yield takeLatest('FETCH_TEST_DATES', fetchTestDates);
};

export default postScoresSaga;