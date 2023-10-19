import {
  Grid,
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Alert,
  Fade,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { useContext, useState } from 'react';

import CustomCheckbox from '../../components/forms/custom-elements/CustomCheckbox';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import PageContainer from '../../components/container/PageContainer';
import SideScreen from './SideScreen';

import logo from '../../assets/images/logos/long_logo.png';
import axios from 'axios';
import {
  backend_url as backendUrl,
} from '../../config/variables';
import { UserContext } from '../../context/UserContext';

const Login = () => {
  const [alert, setAlert] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const { setUserData } = useContext(UserContext);

  setTimeout(() => {
    setShowAlert(alert);
  }, 1000);

  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      user: '',
      password: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = (data) => {
    axios
      .post(`${backendUrl}/api/v1/auth/login`, data)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        setUserData();
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setAlert('Credenciales inválidas');
      });
  };

  return (
    <PageContainer title='Login' description='this is Login page'>
      <Grid container sx={{ height: '100vh', justifyContent: 'center' }}>
        <Grid
          item
          lg={6}
          sx={{
            background: (theme) =>
              `${theme.palette.mode === 'dark' ? '#1c1f25' : '#ffffff'}`,
          }}
          display={{ xs: 'none', lg: 'block' }}>
          <SideScreen />
        </Grid>
        <Grid item xs={12} lg={6} display='flex' alignItems='center'>
          <Grid container >
            <Grid item xs={10} margin='auto' >
              <Box
                display={{
                  xs: 'block',
                  lg: 'none',
                }}
                component='img'
                src={logo}
                alt='bg'
                style={{
                  width: '10em',
                  maxWidth: '812px',
                  margin: 'auto',
                  background: 'transparent',
                }}
                pb={3}
              />
              <Typography
                fontWeight='900'
                variant='h2'
                sx={{ mb: 3 }}
                align='center'>
                Bienvenido a E-scuela
              </Typography>

              <Box
                sx={{
                  mt: 1,
                }}>
                <Controller
                  name='user'
                  control={control}
                  render={({ field }) => (
                    <>
                      <CustomFormLabel htmlFor='email'>Email</CustomFormLabel>
                      <CustomTextField
                        {...register('user', {
                          required: {
                            value: true,
                            message: 'Debe ingresar un correo',
                          },
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Ingrese un correo válido',
                          },
                        })}
                        {...field}
                        ref={null}
                        id='email'
                        variant='outlined'
                        fullWidth
                        label='Ingresa tu correo electrónico'
                        error={!!errors?.user}
                        helperText={errors?.user ? errors.user.message : null}
                      />
                    </>
                  )}
                />
                <Controller
                  name='password'
                  control={control}
                  render={({ field }) => (
                    <>
                      <CustomFormLabel htmlFor='password'>
                        Contraseña
                      </CustomFormLabel>
                      <CustomTextField
                        {...register('password', {
                          required: {
                            value: true,
                            message: 'Debe ingresar su contraseña',
                          },
                        })}
                        {...field}
                        ref={null}
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        variant='outlined'
                        label='Ingresa tu contraseña'
                        fullWidth
                        error={!!errors?.password}
                        helperText={
                          errors?.password ? errors.password.message : null
                        }
                        sx={{
                          mb: 3,
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position='end'>
                              <IconButton
                                aria-label='toggle password visibility'
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}>
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </>
                  )}
                />
                {showAlert && (
                  <Fade
                    timeout={1000}
                    in={!!alert}
                    addEndListener={() => {
                      setTimeout(() => {
                        setAlert(false);
                      }, 6000);
                    }}>
                    <Alert variant='filled' severity='error'>
                      {alert}
                    </Alert>
                  </Fade>
                )}
                <Box
                  sx={{
                    display: {
                      xs: 'block',
                      sm: 'flex',
                      lg: 'flex',
                    },
                    alignItems: 'center',
                  }}>
                  <FormGroup>
                    <FormControlLabel
                      control={<CustomCheckbox defaultChecked />}
                      label='Recordar Dispositivo'
                      sx={{
                        mb: 2,
                      }}
                    />
                  </FormGroup>
                  <Box
                    sx={{
                      ml: 'auto',
                    }}>
                    <Typography
                      component={Link}
                      to='/auth/reset-password'
                      fontWeight='200'
                      sx={{
                        display: 'block',
                        textDecoration: 'underline',
                        mb: '16px',
                        color: 'primary.main',
                      }}>
                      ¿Olvidaste tu constraseña?
                    </Typography>
                  </Box>
                </Box>
                <Button
                  color='primary'
                  variant='contained'
                  size='large'
                  fullWidth
                  onClick={handleSubmit(onSubmit)}
                  // component={Link}
                  to='/'
                  sx={{
                    pt: '10px',
                    pb: '10px',
                  }}>
                  Iniciar Sesión
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Login;
