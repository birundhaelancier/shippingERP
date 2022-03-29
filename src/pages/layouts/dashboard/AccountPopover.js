import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from './MenuPopOver';
import {Home, AccountCircle, Settings} from '@mui/icons-material';
import './common.css';
import Profile from '../../../Images/profile1.jpg'
//
// import account from '../../_mocks_/account';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: <Home />,
    linkTo: '/'
  },
  {
    label: 'Profile',
    icon: <AccountCircle />,
    linkTo: '#'
  },
  {
    label: 'Settings',
    icon: <Settings />,
    linkTo: '#'
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: 'transparent',
            }
          })
        }}
      >
        <Avatar src={Profile}>BE</Avatar>
      </IconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        // style={{background:"#f3f7ff"}}
        sx={{ width: 300}}
      >
        <Box sx={{ my: 1.5, px: 2.5,textAlign:"center" }}>
          {/* <Typography variant="subtitle1" noWrap>
            {"Birundha Elancier"}
          </Typography> */}
          <div className='acct_pop_over'>
          <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Avatar src={Profile}>BE</Avatar></div>
            <div><b>JHONSI</b></div>
           <div> User ID : 54678567</div>
           <div>Organization ID : 354545454</div>
           <div>123elancier@gmail.com</div>
           <div>
             <span>My Account </span> <span> | </span> <span>Sign Out</span>
           </div>
          </div>
        </Box>

        {/* <Divider sx={{ my: 1 }} /> */}

        {/* {MENU_OPTIONS.map((option) => {
          return (
            <div className='profileOption'>
              <div>{option.icon}</div>
              <div>{option.label}</div>
            </div>
          ) */}
          {/* <label>User Id</label> */}
          {/* // <MenuItem
          //   key={option.label}
          //   to={option.linkTo}
          //   component={RouterLink}
          //   onClick={handleClose}
          //   sx={{ typography: 'body2', py: 1, px: 2.5 }}
          // >
          //   <Box
          //     component={Icon}
          //     icon={option.icon}
          //     sx={{
          //       mr: 2,
          //       width: 24,
          //       height: 24
          //     }}
          //   />

          //   {option.label}
          // </MenuItem> */}
        {/* })} */}
{/* 
        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined">
            Logout
          </Button>
        </Box> */}
      </MenuPopover>
    </>
  );
}
