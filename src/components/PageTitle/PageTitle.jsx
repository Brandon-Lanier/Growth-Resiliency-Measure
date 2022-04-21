import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { Typography } from "@mui/material";

function PageTitle() {


    return (
        <>
        <Typography variant="h5">
            {title}
        </Typography>
        </>
    )
}

export default PageTitle;