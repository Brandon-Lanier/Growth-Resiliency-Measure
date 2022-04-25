import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import Flower from '../StudentHomepage/flower.png'
import './AdminLanding.css'


function AdminLanding() {
    
    const user = useSelector(store => store.user)

    return(
        <div className="admin-landing">
            <Typography variant="h3">
                Welcome to the GRM Admin Portal
            </Typography>
            <img src={Flower} id="admin-flower" alt="grm-flower" />
        </div>

    )
}

export default AdminLanding;