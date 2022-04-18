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
    const batch = useSelector(store => store.adminBatch.adminBatches)

    useEffect(() => {
        dispatch({type: 'FETCH_ADMIN_BATCH'})
    }, [])

    console.log(batch);
    console.log(batch.length);



    return (

            <Box sx={{display: 'flex', justifyContent: 'center', width: '100%', mt: 10}}>
                <h1>Broken Component - Needs Review</h1>
            {/* <Typography variant="b1">
                {batch[0].startDate}
            </Typography> */}
              <AddBatch />
            </Box>  
          
    )
}

export default AdminAssess;
