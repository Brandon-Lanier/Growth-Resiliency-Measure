import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


function* studentsSaga() {
    yield takeLatest('FETCH_STUDENTS', fetchStudentsList);
};

function* fetchStudentsList() {
    try {
        const students = yield axios.get('/students');
        yield put({type: 'SET_STUDENTS', payload: students.data})
    } catch(error) {
        console.log('Error in fetchStudentsList Saga', error);
    }
}

export default studentsSaga;

