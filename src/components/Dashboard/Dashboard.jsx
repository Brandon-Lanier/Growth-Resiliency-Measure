import { Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Dashboard() {

    const dispatch = useDispatch();
    const students = useSelector(store => store.students);
    const batch = useSelector(store => store.batch)
  //Need useEffect to get school data to show up on dashboard
  useEffect(() => {
    dispatch({type: 'FETCH_STUDENTS'});
  }, []);

  return (
    <Container sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
        <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="100"
        image="https://www.pinclipart.com/picdir/big/39-394454_student-studying-clipart.png"
        alt="students"
        elevation={10}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {students?.length} Students In Your System!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
        </Grid>
        <Grid item xs={6}>
          trop left
        </Grid>
        <Grid item xs={12}>
          bottom
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;
