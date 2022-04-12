import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { HashRouter as Router, useHistory } from 'react-router-dom';
import { connectAdvanced } from 'react-redux';


function* getStudents() {
    try {
      const students = yield axios.get('/api/student');
      console.log(students.data)
      yield put({ type: 'SET_STUDENTS', payload: students.data });
    } catch (error) {
      alert('Error sending job:', error);
  
    }
  }

  function* jobSaga() {
    yield takeLatest('GET_STUDENTS', getStudents)
  }
  
  export default jobSaga;
  