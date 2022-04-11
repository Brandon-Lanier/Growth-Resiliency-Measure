import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useHistory } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import QuizIcon from '@mui/icons-material/Quiz';
import DownloadIcon from '@mui/icons-material/Download';
import logo from './grmlogo.png'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LogoutIcon from '@mui/icons-material/Logout';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SchoolIcon from '@mui/icons-material/School';
import './NavBar.css'

function NavBar() {
  const drawerWidth = 230;
  const history = useHistory()

  const navLinks = [
      {
          text: 'Dashboard',
          icon: <DashboardIcon />,
          onClick: () => history.push('/dashboard')
      },
      {
        text: 'Students',
        icon: <SchoolIcon />,
        onClick: () => history.push('/students')
      },
      {
        text: 'Assessments',
        icon: <QuizIcon />,
        onClick: () => history.push('/assessments')
      },
      {
        text: 'Data Export',
        icon: <DownloadIcon />,
        onClick: () => history.push('/download')
      },
      {
        text: 'Teachers',
        icon: <SupervisorAccountIcon />,
        onClick: () => history.push('/teachers')
      },
      {
        text: 'Schools',
        icon: <LocationCityIcon />,
        onClick: () => history.push('/schools')
      },
      {
        text: 'Logout',
        icon: <LogoutIcon />,
        onClick: () => history.push('/logout')
      }
  ]

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
    
        },
      }}
      variant="permanent"
      anchor="left"
      PaperProps={{ elevation: 9 }}
    >
      <img src={logo} id="logo-bar"/>
      <List>
        {navLinks.map((item, index) => { 
        return (  
          <ListItem 
          button 
          key={index}
          onClick={item.onClick}
          >
            <ListItemIcon sx={{color: '#fff'}}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        )})}
      </List>
      <Divider />
    </Drawer>
  );
}

export default NavBar;
