import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddBatch from "../AddBatch/AddBatch";
import { Divider } from "@mui/material";
import "./AdminAssess.css";
import BackButton from "../BackButton/Backbutton";

function AdminAssess() {

  const dispatch = useDispatch();
  const history = useHistory();
  const batch = useSelector((store) => store.adminBatch.adminBatches);

  useEffect(() => {
    dispatch({ type: "FETCH_ADMIN_BATCH" });
  }, []);

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#111827',
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    <div className="component-container">
      <BackButton history={history}/>
      <AddBatch />
      <Divider sx={{m:5}}/>
      <Typography variant="h5">
          Past Assessments:
        </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", width: "60%" }}
      >
       
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Batch Number</StyledTableCell>
                <StyledTableCell align="left">Semester Number</StyledTableCell>
                <StyledTableCell align="left">Year</StyledTableCell>
                <StyledTableCell align="left">School ID</StyledTableCell>
                <StyledTableCell align="left">Start Date</StyledTableCell>
                <StyledTableCell align="left">End Date</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {batch?.map((row) => (
                <StyledTableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <StyledTableCell component="th" scope="row">
                    {row?.batchNumber}
                  </StyledTableCell>
                  <StyledTableCell align="left">{row?.semesterNumber}</StyledTableCell>
                  <StyledTableCell align="left">{row?.fiscalYear}</StyledTableCell>
                  <StyledTableCell align="left">{row?.schoolId}</StyledTableCell>
                  <StyledTableCell align="left">
                    {new Date(row?.startDate).toDateString()}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {new Date(row?.endDate).toDateString()}
                  </StyledTableCell>
                </StyledTableRow>
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
