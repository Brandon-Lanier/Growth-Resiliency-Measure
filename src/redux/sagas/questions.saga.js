import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// Saga to handle fetching all questions from client
function* fetchQuestionsSaga() {
    yield takeLatest('FETCH_QUESTIONS', fetchQuestions)
};

// Pull all questions from DB
function* fetchQuestions() {
    try {
        const questions = yield axios.get('/questions');
        // console.log('INSIDE FETCH QUESTIONS');
        yield put({type: 'SET_QUESTIONS', payload: questions.data});
    } catch(error) {
        console.log('Failed to get questions in questions saga', error);
    }
}

export default fetchQuestionsSaga;