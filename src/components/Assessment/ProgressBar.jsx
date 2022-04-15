import LinearProgress from "@mui/material/LinearProgress";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

function ProgressBar(progress) {

    console.log(progress.progress);
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="determinate" value={progress.progress} />
    </Box>
  );
}

export default ProgressBar;
