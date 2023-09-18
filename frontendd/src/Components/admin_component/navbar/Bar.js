import React, { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useMediaQuery, useTheme } from '@mui/material';
import './styling.css';


function SideNavbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>

        <Typography
        variant="h4"
        style={{
          position:  'absolute', // Position based on screen size
          top: '5px',
          left: isMobile ? 'unset' : '12%', // Left or right based on screen size
          right: isMobile ? 0 : 'unset', // Right or unset based on screen size
          marginRight: '8px', // Adjust margin as needed
        }}
      >
        UserForm
      </Typography>
      
      {isMobile && (
        <IconButton
          className="my-app-button"
          color="inherit"
          aria-label={drawerOpen ? 'Close Sidebar' : 'Open Sidebar'}
          onClick={toggleDrawer}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: 'transparent !important',
            paddingTop:10, 
            paddingLeft:10,
            borderRadius: 0, // Remove any border radius
            justifyContent: 'flex-start',
          }}
        >
          {drawerOpen ? <CloseIcon /> : <MenuIcon />} 
        </IconButton>
      )}
      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        anchor="left"
        open={!isMobile || drawerOpen}
        onClose={toggleDrawer}
      >
      {drawerOpen && (
        <IconButton
          color="inherit"
          aria-label="Close Sidebar"
          onClick={closeDrawer}
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: 'transparent',
            padding: 0,
            borderRadius: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
      )}

        <List>
          <ListItem button>
          {/* <p className='welcomeAdmin'> Welcome <br/><strong>User</strong></p> */}
            <ListItemText primary=" Welcome User" />
          </ListItem>
          <ListItem button>
            
           
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ContactMailIcon />
            </ListItemIcon>
            <ListItemText primary="Contact" />
          </ListItem>
        </List>
       
       
      </Drawer>
      
      
    </>
  );
}

export default SideNavbar;
