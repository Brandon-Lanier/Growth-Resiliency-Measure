import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function StudentDetails(){
  const history = useHistory ();
  const dispatch = useDispatch();
  const studentDetails = useSelector((store) => store.studentReducer.studentDetailsReducer);
console.log(studentDetails.details)
const [userId, setUserId] = useState (studentDetails.details.userId)


    return(
        <>  
<h2>
    {studentDetails.details.firstName}<span> </span>
    {studentDetails.details.lastName}<br></br>
    School:<span> </span>{studentDetails.details.schoolId}
</h2>
    </>
    )
}

export default StudentDetails;