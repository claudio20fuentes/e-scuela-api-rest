import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import FeatherIcon from 'feather-icons-react';
import {
  AppBar,
  Box,
  IconButton,
  Toolbar,
  Menu,
  Typography,
  Chip,
  Avatar,
  Button,
  Badge,
  TextField,
} from '@mui/material';
import PropTypes from 'prop-types';
// // Dropdown Component
import ProfileDropdown from './ProfileDropdown';
import blankUser from '../../../assets/images/backgrounds/blank-user.jpeg';
import { UserContext } from '../../../context/UserContext';

const Header = ({ sx, customClass, toggleSidebar, toggleMobileSidebar }) => {
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl3, setAnchorEl3] = React.useState(null);
  const [anchorEl4, setAnchorEl4] = React.useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Iterate over the array and look for an object with the matching ID
  const handleClick3 = (event) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose3 = () => {
    setAnchorEl3(null);
  };

  const handleKeyDown = (event) => {
    // Allow lowercase "s" key to be inputted
    if (event.key === 's' || event.key === 'S') {
      return;
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    // logica de logout
    setAnchorEl4(null);
  };
  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <AppBar sx={sx} elevation={0} className={customClass}>
      <Toolbar>
        <IconButton
          edge='start'
          color='inherit'
          aria-label='menu'
          onClick={toggleSidebar}
          size='large'
          sx={{
            display: {
              lg: 'flex',
              xs: 'none',
            },
          }}>
          <FeatherIcon icon='menu' />
        </IconButton>

        <IconButton
          size='large'
          color='inherit'
          aria-label='menu'
          onClick={toggleMobileSidebar}
          sx={{
            display: {
              lg: 'none',
              xs: 'flex',
            },
          }}>
          <FeatherIcon icon='menu' width='20' height='20' />
        </IconButton>
        <Box flexGrow={1} />
        <IconButton
          size='large'
          aria-label='menu'
          color='inherit'
          aria-controls='notification-menu'
          aria-haspopup='true'
          onClick={handleClick}>
          <Badge variant='dot' color='secondary'>
            <FeatherIcon icon='bell' width='20' height='20' />
          </Badge>
        </IconButton>
        {
          <Menu
            id='notification-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            sx={{
              '& .MuiMenu-paper': {
                width: '385px',
                right: 0,
                top: '70px !important',
              },
              '& .MuiList-padding': {
                p: '30px',
              },
            }}>
            <Box
              sx={{
                mb: 1,
              }}>
              <Box display='flex' alignItems='center'>
                <Typography variant='h4' fontWeight='500'>
                  Notifications
                </Typography>
                <Box
                  sx={{
                    ml: 2,
                  }}>
                  <Chip
                    size='small'
                    label='5 new'
                    sx={{
                      borderRadius: '6px',
                      pl: '5px',
                      pr: '5px',
                      backgroundColor: (theme) => theme.palette.warning.main,
                      color: '#fff',
                    }}
                  />
                </Box>
              </Box>
            </Box>
            
            <Button
              sx={{
                mt: 2,
                display: 'block',
                width: '100%',
              }}
              variant='contained'
              color='primary'
              onClick={handleClose}>
              <Link
                to='/email'
                style={{
                  color: '#fff',
                  width: '100%',
                  display: 'block',
                  textDecoration: 'none',
                }}>
                See all notifications
              </Link>
            </Button>
          </Menu>
        }
        {/* ------------------------------------------- */}
        {/* End Notifications Dropdown */}
        {/* ------------------------------------------- */}

        <Box
          sx={{
            width: '1px',
            backgroundColor: 'rgba(0,0,0,0.1)',
            height: '25px',
            ml: 1,
            mr: 1,
          }}
        />
        {/* ------------------------------------------- */}
        {/* Profile Dropdown */}
        {/* ------------------------------------------- */}
        <Button
          aria-label='menu'
          color='inherit'
          aria-controls='profile-menu'
          aria-haspopup='true'
          onClick={handleClick4}>
          <Box display='flex' alignItems='center'>
            <Avatar
              src={blankUser}
              alt={'user-img'}
              sx={{
                width: '30px',
                height: '30px',
              }}
            />
            <Box
              sx={{
                display: {
                  xs: 'none',
                  sm: 'flex',
                },
                alignItems: 'center',
              }}>
              <Typography
                variant='h5'
                fontWeight='700'
                sx={{
                  ml: 1,
                }}>
                {user.name}
              </Typography>
              <FeatherIcon icon='chevron-down' width='20' height='20' />
            </Box>
          </Box>
        </Button>
        <Menu
          id='profile-menu'
          anchorEl={anchorEl4}
          keepMounted
          open={Boolean(anchorEl4)}
          onClose={handleClose4}
          sx={{
            '& .MuiMenu-paper': {
              width: '385px',
              right: 0,
              top: '70px !important',
            },
            '& .MuiList-padding': {
              p: '30px',
            },
          }}>
          <Box
            sx={{
              mb: 1,
            }}>
            <Box display='flex' alignItems='center'>
              <Typography variant='h4' fontWeight='500'>
                Perfil de Usuario{/* User Profile */}
              </Typography>
            </Box>
          </Box>

          <ProfileDropdown handleClose={handleClose4} />
          <Link
            style={{
              textDecoration: 'none',
            }}
            onClick={handleLogout}
            to='/auth/login'>
            <Button
              sx={{
                mt: 2,
                display: 'block',
                width: '100%',
              }}
              variant='contained'
              color='primary'>
              Cerrar sesión{/* Logout */}
            </Button>
          </Link>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  customClass: PropTypes.string,
  toggleSidebar: PropTypes.func,
  toggleMobileSidebar: PropTypes.func,
};

export default Header;
