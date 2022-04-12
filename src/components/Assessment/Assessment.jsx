import { useEffect } from "react";
import { useDispatch } from "react-redux";


function Assessment() {
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch('FETCH_QUESTIONS')
    })

    return (
        <div>


        </div>
    )
}

export default Assessment;