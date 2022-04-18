import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchSchools() {
    yield takeLatest('FETCH_ALL_SCHOOLS', fetchAllSchools)
}

function* fetchAllSchools() {
    try {
        const schools = yield axios.get('/api/schools');
        yield put({type: 'SET_ALL_SCHOOLS', payload: schools.data})
    } catch (error) {
        console.log('Error fetching all schools in schools saga', error);
        
    }
}

export default fetchSchools;