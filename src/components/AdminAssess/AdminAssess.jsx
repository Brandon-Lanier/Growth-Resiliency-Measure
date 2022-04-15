import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function AdminAssess() {

    const dispatch = useDispatch();
    const batch = useSelector(store => store.AdminAssess)

    useEffect(() => {
        
    })
    return (
        <div>
            <Typography variant="b1">
            
            </Typography>
            
        </div>
    )
}

export default AdminAssess;