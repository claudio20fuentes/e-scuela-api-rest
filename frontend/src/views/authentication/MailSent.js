import { Link } from 'react-router-dom';
import { Grid, Box, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import PageContainer from '../../components/container/PageContainer';
import { useForm, Controller } from 'react-hook-form';
import CustomTextField from '../../components/forms/custom-elements/CustomTextField';
import CustomFormLabel from '../../components/forms/custom-elements/CustomFormLabel';



const ResetPassword = () => {
  const { state } = useLocation();
  const code = state.code;
  const mail = state.mail;
  const navigate = useNavigate();
  setTimeout(() => {;
  }, 1000);
  const {
    control,
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    defaultValues: {
      code: '',
    },
    mode: 'onTouched',
  });
  const onSubmit = async (data) => {
    if (parseInt(data.code) === code) { // quiere decir que el codigo guardado coincide con el codigo ingresado
      navigate('/auth/new-password', { state: { mail: mail } });
    } else {
      alert('El codigo ingresado no coincide con el enviado al correo');
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
                  Correo enviado!
                </Typography>

                <Typography
                  color='textSecondary'
                  variant='h5'
                  fontWeight='400'
                  sx={{
                    mt: 2,
                  }}>
                  Se ha enviado un correo electrónico a tu bandeja de entrada.
                  Sigue las instrucciones para restablecer la contraseña.
                </Typography>
                <Box
                  sx={{
                    mt: 4,
                  }}>
                  <Controller
                    name='code'
                    control={control}
                    render={({ field }) => (
                      <>
                        <CustomFormLabel htmlFor='code'>Codigo Verificador</CustomFormLabel>
                        <CustomTextField
                          {...register('code', {
                            required: {
                              value: true,
                              message: 'Debe ingresar el codigo del correo',
                            }
                          })}
                          {...field}
                          ref={null}
                          id='code'
                          variant='outlined'
                          fullWidth
                          label='Ingresa el codigo del correo'
                          error={!!errors?.code}
                          helperText={errors?.code ? errors.code.message : null}
                          sx={{
                            mb: 2,
                          }}
                        />
                                        <Button
                    color='secondary'
                    variant='contained'
                    size='large'
                    fullWidth
                    onClick={handleSubmit(onSubmit)}
                    component={Link} // debo aca enviar un state con navigate
                    sx={{
                      pt: '10px',
                      pb: '10px',
                      mt: 2,
                    }}>
                    Dirigirse al cambio de contraseña
                  </Button>
                      </>
                    )}
                  />
                </Box>

                <Box
                  sx={{
                    mt: 2,
                  }}>
                  <Typography
                  color='textSecondary'
                  variant='h5'
                  fontWeight='400'
                  sx={{
                    mt: 2,
                  }}>
                  En caso de no recibo de mail porfavor intentar nuevamente.
                </Typography>
                  <Button
                    color='secondary'
                    variant='contained'
                    size='large'
                    fullWidth
                    component={Link}
                    to='/auth/reset-password'
                    sx={{
                      pt: '10px',
                      pb: '10px',
                      mt: 4,
                      // que el color de este boton sea de otro color
                    }}>
                    Enviar Correo Nuevamente
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

export default ResetPassword;
