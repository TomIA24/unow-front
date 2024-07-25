import React, { useEffect, useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Notifications from './Notifications'
import Modal from '@mui/material/Modal';
import Loading from '../Loading'
import  styles from './styles.module.css'
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));



const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [nbNotif, setNbNotif]=useState(localStorage.getItem("NbNotif"))
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifAnchorEl, setNotifAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [NotifModal, setNotifModal] = useState(false)
  const [NotifInfo, setNotifInfo] = useState({})

  const setNotifOpenModal = (notif) => {
    setNotifModal(true)
    setNotifInfo(notif)
  }

  const isMenuOpen = Boolean(anchorEl);
  const isNotifOpen = Boolean(notifAnchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotifMenuOpen = (event) => {
    setNotifAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
    setNotifAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleNotifClose = () => {
    setNotifAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  useEffect(()=>{
    setNbNotif(localStorage.getItem("NbNotif"))
  },[])

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const NotifId = 'primary-search-account-menu';
  const renderNotifs = (
    <Menu
    sx={{mt:5}}
      anchorEl={notifAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={NotifId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isNotifOpen}
      onClose={handleNotifClose}
    >
      <Notifications setNotifOpenModal={setNotifOpenModal}/>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={0} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleNotifMenuOpen}>
        <IconButton
          size="large"
          aria-label="show x new notifications"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          
        >
          <Badge badgeContent={nbNotif} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,

  };
  
  const Month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={0} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="center"
              aria-label="notifications of current admin"
              aria-controls={NotifId}
              aria-haspopup="true"
              onClick={handleNotifMenuOpen}
              color="inherit"
            >
              
                <Badge badgeContent={nbNotif} color="error">
                  <NotificationsIcon />
                </Badge>
              
            </IconButton>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderNotifs}
      {renderMobileMenu}
      {renderMenu}
      <Modal
        sx={{p:1}}
        open={NotifModal}
        onClose={()=>{setNotifModal(false)}}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        >

            <Box  sx={{ ...style, width: 450, display:'flex'
                ,flexDirection: 'column', overflowY:'auto', overflowX:'hidden', maxHeight:'85vh',alignItems:'center' }}>
                  {NotifInfo.user?
                    <React.Fragment>
                      <h1>Notification from : {NotifInfo.user.name}</h1>
                      <h4>Training to customize : {NotifInfo.course.Title}</h4>
                      <br />
                      
                      <div className={styles.NotificationBlock}>
                        {NotifInfo.date?
                            <p>
                          - <strong>{NotifInfo.user.name}</strong> want to change the date of the training to :<br/> from {(new Date(NotifInfo.date[0])).getDate()}/{Month[(new Date(NotifInfo.date[0])).getMonth()]} to {(new Date(NotifInfo.date[1])).getDate()}/{Month[(new Date(NotifInfo.date[1])).getMonth()]}-{(new Date(NotifInfo.date[1])).getFullYear()}
                            </p>:""
                        }
                        {NotifInfo.time?
                            <p>
                          - <strong>{NotifInfo.user.name}</strong> want to change the time of the training to : {(new Date(NotifInfo.time)).getHours()<10 ? "0"+(new Date(NotifInfo.time)).getHours(): (new Date(NotifInfo.time)).getHours()}:{(new Date(NotifInfo.time)).getMinutes()<10 ? "0"+(new Date(NotifInfo.time)).getMinutes() : (new Date(NotifInfo.time)).getMinutes()}
                            </p>:""
                        }
                        {NotifInfo.duration?
                            <p>
                          - <strong>{NotifInfo.user.name}</strong> want to change the duration of the training to : {NotifInfo.duration}
                            </p>:""
                        }
                        {NotifInfo.message?
                            <p>
                          - <strong>{NotifInfo.user.name}</strong> send a message to customize the training : {NotifInfo.message}
                            </p>:""
                        }
                      </div>
                    </React.Fragment>  
                    :
                    <Loading/>
                }

            </Box>
      </Modal>
    </Box>
  );
}