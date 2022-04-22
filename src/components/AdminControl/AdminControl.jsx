import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import axios from "axios";
import AddAdminDialog from "./AddAdminDialog";
import AdminTable from "./AdminTable";
import { Divider, Typography } from "@mui/material";

function AdminControl(props) {
  //   const school = useSelector((store) => store);
  //   const admins = useSelector((store) => store.admins)
  const [heading, setHeading] = useState("Add Assessment Cohort");
  const [admins, setAdmins] = useState([]);
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetchAdministrators();
    dispatch({type: 'SET_SUPERADMIN_PATH'})
  }, []);

  const dispatch = useDispatch();

  const fetchAdministrators = () => {
    axios
      .get("/api/admincsv")
      .then((response) => {
        console.log("GET response.data is", response.data);
        setAdmins(response.data.admins);
        setSchools(response.data.schools);
      })
      .catch((err) => {
        console.log("GET error is", err);
      });
  };

  const removeAdmin = (id) => {
    axios.delete(`/api/admincsv/${id}`)
    .then((res) => {
        console.log('Deleted administrator row');
        fetchAdministrators();
    })
    .catch((err) => {
        console.log('Error on delete admin');
    });
  };

  return (
    <div className="component-container">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <AddAdminDialog schools={schools} admins={admins} get={fetchAdministrators}/>
        <Divider sx={{mt:2}}/>
        {schools.map((school) => (
          <div className="school-container">
            <Typography variant="h5">
              {school.name}
            </Typography>
            <AdminTable
              key={school.id}
              admins={admins}
              school={school}
              removeAdmin={removeAdmin}
            />
           </div>
        ))}
      </Box>
    </div>
  );
}

export default AdminControl;
