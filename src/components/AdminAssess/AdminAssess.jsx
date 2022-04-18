import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";

function AdminAssess() {
  const dispatch = useDispatch();
  const batch = useSelector((store) => store.adminBatch.adminBatches);

  useEffect(() => {
    dispatch({ type: "FETCH_ADMIN_BATCH" });
  }, []);

  console.log(batch);
  console.log(batch.length);

  return (
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
                <TableCell align="right">{row?.startDate}</TableCell>
                <TableCell align="right">{row?.endDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AdminAssess;