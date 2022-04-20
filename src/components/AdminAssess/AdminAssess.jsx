import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddBatch from "../AddBatch/AddBatch";
import "./AdminAssess.css";
import BackButton from "../BackButton/Backbutton";

function AdminAssess() {

  const dispatch = useDispatch();
  const history = useHistory();
  const batch = useSelector((store) => store.adminBatch.adminBatches);

  useEffect(() => {
    dispatch({ type: "FETCH_ADMIN_BATCH" });
  }, []);


  return (
    <div className="component-container">
      <BackButton history={history}/>
      <AddBatch />
      <Box
        sx={{ display: "flex", justifyContent: "center", width: "60%", mt: 10 }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Batch Number</TableCell>
                <TableCell align="right">Semester Number</TableCell>
                <TableCell align="right">Year</TableCell>
                <TableCell align="right">School ID</TableCell>
                <TableCell align="right">Start Date</TableCell>
                <TableCell align="right">End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {batch?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row?.batchNumber}
                  </TableCell>
                  <TableCell align="right">{row?.semesterNumber}</TableCell>
                  <TableCell align="right">{row?.fiscalYear}</TableCell>
                  <TableCell align="right">{row?.schoolId}</TableCell>
                  <TableCell align="right">
                    {new Date(row?.startDate).toDateString()}
                  </TableCell>
                  <TableCell align="right">
                    {new Date(row?.endDate).toDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <div className="add-batch">
        
      </div>
    </div>
  );
}

export default AdminAssess;
