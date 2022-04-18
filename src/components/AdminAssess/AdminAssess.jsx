import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";


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