import React, { useContext } from 'react';
import {
  Box,
  MenuItem,
  Typography,
  Avatar,
  Button,
  Divider,
  Link,
} from '@mui/material';
import FeatherIcon from 'feather-icons-react';
import blankUser from '../../../assets/images/backgrounds/blank-user.jpeg';
import { UserContext } from '../../../context/UserContext';

const ProfileDropdown = ({ handleClose }) => {
  const { user } = useContext(UserContext);
  return (
    <Box>
      <Box
        sx={{
          pb: 3,
          mt: 3,
        }}>
        <Box display='flex' alignItems='center'>
          <Avatar
            src={blankUser}
            alt='user-img'
            sx={{
              width: '90px',
              height: '90px',
            }}
          />
          <Box
            sx={{
              ml: 2,
            }}>
            <Typography
              variant='h4'
              sx={{
                lineHeight: '1.235',
              }}>
              {user.nombre}
            </Typography>
            <Box display='flex' alignItems='center'>
              <Typography
                color='textSecondary'
                display='flex'
                alignItems='center'
                sx={{
                  color: (theme) => theme.palette.grey.A200,
                  mr: 1,
                }}>
                <FeatherIcon icon='mail' width='18' />
              </Typography>
              <Typography color='textSecondary' variant='h6'>
                {user.mail}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider
        style={{
          marginTop: 0,
          marginBottom: 0,
        }}
      />

      <Box>
        <Link href={`#/settings/user/`} underline='none' onClick={handleClose}>
          <MenuItem
            sx={{
              pt: 3,
              pb: 3,
            }}>
            <Box display='flex' alignItems='center'>
              {/* <Button
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.light,
                  color: (theme) => theme.palette.primary.main,
                  boxShadow: 'none',
                  minWidth: '50px',
                  width: '45px',
                  height: '40px',
                  borderRadius: '10px',
                }}>
                <FeatherIcon icon='user' width='18' height='18' />
              </Button> */}
              <Box
                sx={{
                  ml: 2,
                }}>
                <Typography
                  variant='h5'
                  sx={{
                    lineHeight: '1.235',
                  }}>
                  Mi Perfil
                </Typography>
                <Typography
                  color='textSecondary'
                  variant='h6'
                  fontWeight='400'></Typography>
              </Box>
            </Box>
          </MenuItem>
        </Link>
        <Divider></Divider>
        <Link href={`#/settings/company/`} underline='none' onClick={handleClose}>
          <MenuItem
            sx={{
              pt: 3,
              pb: 3,
            }}>
            <Box display='flex' alignItems='center'>
              {/* <Button
                sx={{
                  backgroundColor: (theme) => theme.palette.secondary.light,
                  color: (theme) => theme.palette.secondary.main,
                  boxShadow: 'none',
                  minWidth: '50px',
                  width: '45px',
                  height: '40px',
                  borderRadius: '10px',
                }}>
                <FeatherIcon icon='settings' width='18' height='18' />
              </Button> */}
              <Box
                sx={{
                  ml: 2,
                }}>
                <Typography
                  variant='h5'
                  sx={{
                    lineHeight: '1.235',
                  }}>
                  Configuración
                </Typography>
                <Typography color='textSecondary' variant='h6' fontWeight='400'>
                  Administración
                </Typography>
              </Box>
            </Box>
          </MenuItem>
        </Link>
        <Divider
          style={{
            marginTop: 0,
            marginBottom: 0,
          }}
        />
      </Box>
    </Box>
  );
};

export default ProfileDropdown;
