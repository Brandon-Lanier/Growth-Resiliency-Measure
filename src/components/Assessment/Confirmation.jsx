import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Confirmation() {
  const dispatch = useDispatch();
  const scores = useSelector((store) => store.scores);

  useEffect(() => {
    dispatch({ type: "FETCH_STUDENT_SCORES" });
  }, []);

  return (
    <div className="result-container">
      {scores?.map((def, index) => {
          return (
        <div key={index}>
          <p>{def?.measure}</p>
          <p>{Number(def?.avgScore).toFixed(2)}</p>
        </div>
          )
      })}
    </div>
  );
}

export default Confirmation;
