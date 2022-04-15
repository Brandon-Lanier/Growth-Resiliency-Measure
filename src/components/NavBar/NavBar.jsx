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

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const dispatch = useDispatch();

  const history = useHistory();
  const user = useSelector((store) => store.user);
  let navLinks = [];

  if (user.permission === 1) {
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
          history.push("/login");
          dispatch({ type: "LOGOUT" });
        },
      },
    ];
  } else {
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
          history.push("/login");
          dispatch({ type: "LOGOUT" });
        },
      },
    ];
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
          backgroundColor: '#fff'
        }}
        elevation={1}
      >
        
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {/* 
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>*/}
        </Toolbar>
      </AppBar> 
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <img src={logo} id="logo-bar" />
          <List>
            {navLinks.map((item, index) => {
              return (
                <ListItem button key={index} onClick={item.onClick}>
                  <ListItemIcon sx={{ color: "#fff" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              );
            })}
          </List>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.08)",
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "rgba(255, 255, 255, 0.08)"
            },
            
          }}
          open
        >
          <img src={logo} id="logo-bar" />
          <List>
            {navLinks.map((item, index) => {
              return (
                <ListItem button key={index} onClick={item.onClick}>
                  <ListItemIcon sx={{ color: "#fff" }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
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
