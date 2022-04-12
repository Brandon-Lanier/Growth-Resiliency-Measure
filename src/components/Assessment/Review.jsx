
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Modal, Box, Stack, Typography, Button, Fade } from "@mui/material";

function Review() {

    const dispatch = useDispatch();
    const answers = useSelector(store => store.assessment)

    const handleSubmit = () => {
        dispatch({type: 'POST_SCORES', payload: answers})
    }



    return (
        <div>
            
        </div>

    )
}

export default Review;