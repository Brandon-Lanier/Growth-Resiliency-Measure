import { useHistory } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import QuizIcon from "@mui/icons-material/Quiz";
import DownloadIcon from "@mui/icons-material/Download";
import logo from "./grmlogo.png";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LogoutIcon from "@mui/icons-material/Logout";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import SchoolIcon from "@mui/icons-material/School";
import "./NavBar.css";
import UserPage from "../UserPage/UserPage";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import PageTitle from '../PageTitle/PageTitle';
import BackButton from "../BackButton/Backbutton";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import grm from './grm.png'


const drawerWidth = 240;


function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const path = useSelector(store => store.path);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const dispatch = useDispatch();

  const history = useHistory();
  const user = useSelector((store) => store.user);
  let navLinks = [];

  // Determines Navlinks based on permission, could put into reducer 
  if (user.permission === 2) {
    navLinks = [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        onClick: () => history.push("/dashboard"),
      },
      {
        text: "Administrative",
        icon: <AdminPanelSettingsIcon />,
        onClick: () => history.push("/superadmin"),
      },
      {
        text: "Students",
        icon: <SchoolIcon />,
        onClick: () => history.push("/students"),
      },
      {
        text: "Assessments",
        icon: <QuizIcon />,
        onClick: () => history.push("/assessmentoverview"),
      },
      {
        text: "Data Export",
        icon: <DownloadIcon />,
        onClick: () => history.push("/csvExport"),
      },
      {
        text: "Schools",
        icon: <LocationCityIcon />,
        onClick: () => history.push("/schools"),
      },
      {
        text: "Logout",
        icon: <LogoutIcon />,
        onClick: () => {
          history.push("/home");
          dispatch({ type: "LOGOUT" });
        },
      },
    ];
  } else if (user.permission === 1) {
    navLinks = [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        onClick: () => history.push("/dashboard"),
      },
      {
        text: "Students",
        icon: <SchoolIcon />,
        onClick: () => history.push("/students"),
      },
      {
        text: "Assessments",
        icon: <QuizIcon />,
        onClick: () => history.push("/assessmentoverview"),
      },
      {
        text: "Data Export",
        icon: <DownloadIcon />,
        onClick: () => history.push("/csvExport"),
      },
      {
        text: "Schools",
        icon: <LocationCityIcon />,
        onClick: () => history.push("/schools"),
      },
      {
        text: "Logout",
        icon: <LogoutIcon />,
        onClick: () => {
          history.push("/home");
          dispatch({ type: "LOGOUT" });
          dispatch({type: 'CLEAR_PATh'})
        },
      },
    ];
  } else if (user.permission === 0){
    navLinks = [
      {
        text: "Dashboard",
        icon: <DashboardIcon />,
        onClick: () => history.push("/dashboard"),
      },
      {
        text: "Assessment",
        icon: <QuizIcon />,
        onClick: () => history.push("/student"),
      },
      {
        text: "Logout",
        icon: <LogoutIcon />,
        onClick: () => {
          history.push("/home");
          dispatch({ type: "LOGOUT" });
        },
      },
    ];
  } else {
    navLinks = [
      {
        text: "Login",
        icon: <DashboardIcon />,
        onClick: () => history.push("/login"),
      }
    ];
  }

  const colorChange = () => {
    if (user.permission === 2) {
      return '#fff'
    } else {
      return '#111827'
    }
  }

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: colorChange
        }}
        elevation={1}
      > 
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuIcon sx={{color: '#fff'}}/>
          </IconButton>
          {user.permission === 2 
          ?
          <>
          <BackButton history={history} />
           <Typography variant="h5" sx={{ml: 1, mb: 0}}>
          {path}
          </Typography>
          </>
          :
         <></> }
        </Toolbar>
       
      </AppBar> 
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="nav folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          paperProps={{
            color: 'black',
            backgroundColor: 'black'
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#111827"
            },
          }}
        >
          <img src={grm} id="logo-bar" />
          <List>
            {navLinks.map((item, index) => {
              return (
                <ListItem button key={index} onClick={item.onClick}>
                  <ListItemIcon sx={{ color: "#D1D5DB" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{color: '#D1D5DB'}}/>
                </ListItem>
              );
            })}
          </List>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            backgroundColor: "#111827",
            color: '#fff',
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "#111827",

            },
            
          }}
          open
        >
          <img src={grm} id="logo-bar" />
          <List>
            {navLinks.map((item, index) => {
              return (
                <ListItem button key={index} onClick={item.onClick}>
                  <ListItemIcon sx={{ color: "#D1D5DB" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{color: '#D1D5DB'}}/>
                </ListItem>
              );
            })}
          </List>
        </Drawer>
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
