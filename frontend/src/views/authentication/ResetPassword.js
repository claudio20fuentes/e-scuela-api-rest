import { useState } from 'react';
import { Grid, Box, Typography, Button, Fade, Alert } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../assets/images/logos/long_logo.png';
import PageContainer from '../../components/container/PageContainer';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';
import SideScreen from './SideScreen';

import axios from 'axios';
import { backend_url } from '../../config/variables';
import { set } from 'lodash';

const ResetPassword = () => {
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
  } = useForm({
    defaultValues: {
      user: '',
    },
    mode: 'onTouched',
  });

  const navigate = useNavigate();
  const sendMail = async (data) => {
    const generatedCode = Math.floor(100000 + Math.random() * 900000);
    try {
      await axios
        .post(`${backend_url}/api/send-mail`, {
          mail: data.user,
          code: generatedCode,
        })
        .then((res) => {
          if (res.data.success && res.data.success === true) {
            navigate('/auth/mail-sent', {
              state: { code: generatedCode, mail: data.user },
            });
          } else {
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    try {
      // chequear con backend si mail existe:
      // si existe, enviar mail con link para resetear password y cambiar a vista de mail enviado
      await axios
        .post(`${backend_url}/api/validate-mail`, { mail: data.user })
        .then((res) => {
          localStorage.setItem('token', '');
          localStorage.setItem('successStatus', '');
          if (res.data.success && res.data.success === true) {
            sendMail(data);
          } else {
            setAlert('Correo no Existe');
            console.log(errors);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer
      title='Reset Password'
      description='this is Reset Password page'>
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
          <SideScreen />
        </Grid>
        <Grid item xs={12} sm={8} lg={6} display='flex' alignItems='center'>
          <Grid container>
            <Grid item xs={10} margin='auto'>
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
              <Typography variant='h2' fontWeight='700'>
                ¿Olvidaste tu contraseña?
              </Typography>
              <Typography
                color='textSecondary'
                variant='h5'
                fontWeight='400'
                sx={{
                  mt: 2,
                }}>
                Ingresa el correo electrónico asociado a tu cuenta y nosotros te
                enviaremos un enlace para restablecer tu contraseña
              </Typography>

              <Box
                sx={{
                  mt: 4,
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
                        sx={{
                          mb: 2,
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
                  onClick={handleSubmit(onSubmit)}
                  component={Link}
                  to='/auth/reset-password' // aca debe ir la ruta de reset password para que se envie el correo
                  sx={{
                    pt: '10px',
                    pb: '10px',
                    mt: 2,
                  }}>
                  Restablecer Contraseña
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ResetPassword;
