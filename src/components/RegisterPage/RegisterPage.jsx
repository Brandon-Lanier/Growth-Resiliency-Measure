import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import RegisterAdminDialog from '../AdminControl/AddAdminDialog.jsx';

function RegisterPage() {
  const history = useHistory();



  return (
    <div>

    <div>
      <RegisterForm />

      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/login');
          }}
          >
          Login
        </button>
      </center>
      <div>
        
        {/* <RegisterAdminDialog/>  */}
      </div>
          </div>
    </div>
  );
}

export default RegisterPage;
