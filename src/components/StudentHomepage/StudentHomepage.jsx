import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";


export default function StudentHomepage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const questions = useSelector((store) => store.questions);
    const batch = useSelector(store => store.batch);
  
    useEffect(() => {
      dispatch({ type: "FETCH_BATCH" });
    }, []);

    // if assessment is available for student, push to assessment page
    // otherwise stay on this page showing no assessments available
    if(batch) {
        history.push('/assessment')
    }

    return(
        <>
            {!batch && 'no assessments available'}
        </>
    )
}