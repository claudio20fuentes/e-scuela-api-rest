import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import imgsvg from '@images/backgrounds/school_hat.svg';

const WelcomeCard = ({ name }) => {
  const firstName = name.split(' ')[0];
  return (
    <Card
      elevation={0}
      style={{ width: '100%' }}
      sx={{
        position: 'relative',
        backgroundColor: (theme) => theme.palette.secondary.main,
        color: 'white',
        '&:before': {
          content: `""`,
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `url(${imgsvg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: '20%',
          transform: (theme) => `${theme.direction === 'rtl' ? '' : 'unset'}`,
          backgroundPosition: {
            xs: 'bottom 40px right 30px',
          },
        },
        borderWidth: '0px',
      }}>
      <CardContent sx={{ height: '100%' }}>
        <Typography
          sx={{
            marginTop: '8px',
            marginBottom: '0px',
            lineHeight: '35px',
            position: 'relative',
            zIndex: 9,
          }}
          variant='h3'
          gutterBottom>
          Hola {firstName}!, Bienvenido a <br /> E-scuela <br />
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
