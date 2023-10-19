import { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Grid, Box, Typography, Button, Fade, Alert } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import PageContainer from '../../components/container/PageContainer';

import axios from 'axios';
import { backend_url } from '../../config/variables';

const NewPassword = () => {
  const [alert, setAlert] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  setTimeout(() => {
    setShowAlert(alert);
  }, 1000);
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
    watch,
  } = useForm({
    defaultValues: {
      password: '',
      password2: '',
    },
    mode: 'onTouched',
  });

  const navigate = useNavigate();

  const passwordValidations = (password) => {
    if (!/[a-z]/.test(password)) {
      return 'La contraseña debe contener al menos una minúscula';
    } else if (!/[A-Z]/.test(password)) {
      return 'La contraseña debe contener al menos una mayúscula';
    } else if (!/\d/.test(password)) {
      return 'La contraseña debe contener al menos un número';
    } else if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
      return 'La contraseña debe contener al menos un caracter especial';
    } else {
      return true;
    }
  };

  const { state } = useLocation();
  const mail = state.mail;
  // const params = new URLSearchParams(location.search);
  // const token = params.get('token');
  if (!mail) {
    // enviar a una vista de que se tiene que hacer denuevo el flujo hubo error
  }
  const onSubmit = async (data) => {
    try {
      // enviar a la api para que haga el cambio de contraseña pero con el token tmbn
      // fetch a la api para que haga el cambio de contraseña
      // manejo de tmbn que la contraseña debe tener al menos 8 caracteres etc........
      // enviar a la api para que haga el cambio de contraseña pero con el token tmbn
      if (data.password !== data.password2) {
        setAlert('Las contraseñas no coinciden');
        return;
      }
      if (data.password.length < 8) {
        setAlert('La contraseña debe tener al menos 8 caracteres');
        return;
      }
      if (passwordValidations(data.password) !== true) {
        setAlert(passwordValidations(data.password));
        return;
      }
      await axios
        .post(`${backend_url}/api/update-password`, {
          mail,
          password: data.password,
        })
        .then((res) => {
          if (res.data.success && res.data.success === true) {
            navigate('/auth/password-updated');
          } else {
          }
        });
    } catch (error) {
      setAlert(
        'Ocurrió un problema al actualizar tu contraseña. Intentalo nuevamente'
      );
    }
  };
  return (
    <PageContainer title='New Password' description='this is New Password page'>
      <Grid
        container
        spacing={0}
        sx={{ height: '100vh', justifyContent: 'center' }}>
        <Grid
          item
          xs={12}
          sm={12}
          lg={6}
          sx={{
            background: (theme) =>
              `${theme.palette.mode === 'dark' ? '#1c1f25' : '#ffffff'}`,
          }}
          display={{ xs: 'none', lg: 'block' }}>
          <Box
            sx={{
              position: 'relative',
            }}>
            <Box
              display='flex'
              alignItems='center'
              justifyContent='center'
              sx={{
                position: {
                  xs: 'relative',
                  lg: 'absolute',
                },
                height: { xs: 'auto', lg: '100vh' },
                right: { xs: 'auto', lg: '10vh' },
                margin: '0 auto',
              }}>
              <img
                src={img1}
                alt='bg'
                style={{
                  width: '100%',
                  maxWidth: '812px',
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} lg={6} display='flex' alignItems='center'>
          <Grid container spacing={0} display='flex' justifyContent='center'>
            <Grid item xs={12} lg={9} xl={6}>
              <Box
                sx={{
                  p: 4,
                }}>
                <Box
                  display={{
                    xs: 'block',
                    lg: 'none',
                  }}>
                  <img
                    src={logo}
                    alt='bg'
                    style={{
                      width: '10em',
                      maxWidth: '812px',
                      margin: '0 auto',
                    }}
                  />
                </Box>
                <Typography variant='h2' fontWeight='700'>
                  Ingresa Nueva Contraseña
                </Typography>

                <Typography
                  color='textSecondary'
                  variant='h5'
                  fontWeight='400'
                  sx={{
                    mt: 2,
                  }}>
                  Ingresa tu nueva contraseña.
                </Typography>

                <Box
                  sx={{
                    mt: 4,
                  }}>
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
                              message: 'Debe ingresar una contraseña',
                            },
                            // patterns get the validations needed
                            pattern: {
                              value:
                                /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#\$%\^&\*])/,
                              message:
                                'Su password debe contener mayúsculas, minúsculas, números y caracter especial',
                            },
                            minLength: {
                              value: 8,
                              message:
                                'La contraseña debe tener al menos 8 caracteres',
                            },
                            validate: (value) => passwordValidations(value),
                          })}
                          {...field}
                          ref={null}
                          id='password'
                          type='password'
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
                        />
                      </>
                    )}
                  />
                  <Controller
                    name='password2'
                    control={control}
                    render={({ field }) => (
                      <>
                        <CustomFormLabel htmlFor='password'>
                          Repite Contraseña
                        </CustomFormLabel>
                        <CustomTextField
                          {...register('password2', {
                            required: {
                              value: true,
                              message: 'Debe repetir su contraseña',
                            },
                            validate: (value) => {
                              if (watch('password') !== value) {
                                return 'Las contraseñas no coinciden';
                              }
                            },
                          })}
                          {...field}
                          ref={null}
                          id='password2'
                          type='password'
                          variant='outlined'
                          label='Re-Ingresa tu contraseña'
                          fullWidth
                          error={!!errors?.password2}
                          helperText={
                            errors?.password2 ? errors.password2.message : null
                          }
                          sx={{
                            mb: 3,
                          }}
                        />
                      </>
                    )}
                  />
                  {showAlert && (
                    <Fade
                      timeout={1000}
                      in={alert}
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
                  <Button
                    color='secondary'
                    variant='contained'
                    size='large'
                    fullWidth
                    component={Link}
                    onClick={handleSubmit(onSubmit)}
                    to='/auth/new-password' // aca debe ir la ruta de reset password para que se envie el correo
                    sx={{
                      pt: '10px',
                      pb: '10px',
                      mt: 4,
                    }}>
                    Cambiar Contraseña
                  </Button>
                  <Button
                    color='secondary'
                    size='large'
                    fullWidth
                    component={Link}
                    to='/auth/login'
                    sx={{
                      pt: '10px',
                      pb: '10px',
                      mt: 2,
                    }}>
                    Regresar al Login
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default NewPassword;
