import React, { useEffect } from "react";
import '@fontsource/roboto/400.css';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import Nav from "../Nav/Nav";
import NavBar from "../NavBar/NavBar";
import { Container } from "@mui/material";

import Footer from "../Footer/Footer";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import AboutPage from "../AboutPage/AboutPage";
import UserPage from "../UserPage/UserPage";
import InfoPage from "../InfoPage/InfoPage";
import LandingPage from "../LandingPage/LandingPage";
import LoginPage from "../LoginPage/LoginPage";
import RegisterPage from "../RegisterPage/RegisterPage";
import CsvExport from "../CsvExport/CsvExport";
import StudentList from "../StudentList/StudentList";
import Schools from "../Schools/Schools";
import Assessment from "../Assessment/Assessment";
import StudentHomepage from "../StudentHomepage/StudentHomepage";
import StudentDetails from "../StudentDetails/StudentDetails";
import StudentEdit from "../StudentDetails/StudentEdit";
import "./App.css";
import Assessment9 from "../Assessment/Assessment9";
import Review from "../Assessment/Review";
import Confirmation from "../Assessment/Confirmation";
import Dashboard from "../Dashboard/Dashboard";
import AdminControl from "../AdminControl/AdminControl";
import AdminAssess from "../AdminAssess/AdminAssess";
import { useLocation } from "react-router-dom";

import Box from "@mui/material/Box";


function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: "FETCH_USER" }), dispatch({ type: "GET_STUDENTS" });
  }, [dispatch]);



  return (
    <Router>
      <div id="appContainer">
        <NavBar />

        {/* <Nav /> */}
        <Switch>
          <Route path="/students">
            <StudentList />
          </Route>

          <ProtectedRoute exact path="/superadmin">
            <AdminControl />
          </ProtectedRoute>

          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            <AboutPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/dashboard"
          >
            {user.permission < 1 ? <StudentHomepage /> : <Dashboard />}
          </ProtectedRoute>
          <ProtectedRoute
            path="/studentedit"
            //Goes straight to an assessment if one is available
          >
            <StudentEdit />
            </ProtectedRoute>
          <ProtectedRoute
            path="/student"
            //Goes straight to an assessment if one is available
          >
            <StudentHomepage />
          </ProtectedRoute>
          {/* 
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/info"
          >
            <InfoPage />
          </ProtectedRoute> */}

          <ProtectedRoute
            // logged in shows Csv export else shows LoginPage
            exact
            path="/csvExport"
          >
            <CsvExport />
          </ProtectedRoute>

         
          <ProtectedRoute
            // Admin Assessment Page
            exact
            path="/assessmentoverview"
          >
            <AdminAssess />
          </ProtectedRoute>

          <ProtectedRoute
            //logged in shows schools page - this is current has option to add a semester
            exact
            path="/schools"
          >
            <Schools />
          </ProtectedRoute>
          <ProtectedRoute
            //logged in shows schools page - this is current has option to add a semester
            exact
            path="/dashboard"
          >
            <Dashboard />
          </ProtectedRoute>
          <ProtectedRoute
            //logged in shows schools page - this is current has option to add a semester
            exact
            path="/studentdetails"
          >
            <StudentDetails />
          </ProtectedRoute>
          <Route exact path="/login">
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to="/dashboard" />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>

          <Route exact path="/registration">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/dashboard" />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>

          <Route exact path="/home">
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to="/dashboard" />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
          </Route>
          <Route exact path="/user">
            {user.id ? (
              <Redirect to="/dashboard"/>
            ) : (
              <LandingPage />
            )}
          </Route>
          <Route path="/assessment">
            <Assessment />
          </Route>
          <Route path="/assessment9">
            <Assessment9 />
          </Route>
          <Route path="/review">
            <Review />
          </Route>
          <Route path="/confirmation">
            <Confirmation />
          </Route>
          {/* If none of the other routes matched, we will show a 404. */}
          <Route>{/* <h1>404</h1> */}</Route>
        </Switch>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
