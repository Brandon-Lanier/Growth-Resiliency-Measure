import { useSelector } from "react-redux";


function AdminLanding() {
    
    const user = useSelector(store => store.user)

    return(
        <div>
            Welcome {user.name}
        </div>

    )
}

export default AdminLanding;