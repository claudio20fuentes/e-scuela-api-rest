import { Grid, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import PageContainer from '../../components/container/PageContainer';


const ResetPassword = () => {
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
                  Contraseña Actualizada!
                </Typography>

                <Typography
                  color='textSecondary'
                  variant='h5'
                  fontWeight='400'
                  sx={{
                    mt: 2,
                  }}>
                  Tu contraseña ha sido actualizada con éxito. Vuelve al Login e
                  ingresa con tu nueva contraseña.
                </Typography>

                <Box
                  sx={{
                    mt: 4,
                  }}>
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
