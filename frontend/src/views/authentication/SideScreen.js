import { Grid, Box, Typography } from '@mui/material';

import logo from '../../assets/images/logos/long_logo.png';
import img1 from '../../assets/images/backgrounds/school-governance.png';

const SideScreen = () => {
  return (
    <Box
      sx={{
        position: 'relative',
      }}>
      <Grid container gap={4}>
        <Grid item xs={12} lg={12} xl={12} mt={3}>
          <Box display='flex' justifyContent='center'>
            <img
              src={logo}
              alt='logo'
              style={{
                width: '250px',
                maxWidth: '812px',
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} lg={12} xl={12}>
          <Box display='flex' justifyContent='center'>
            <img
              src={img1}
              alt='bg'
              style={{
                width: '500px',
                maxWidth: '812px',
                marginBottom: '-5em',
              }}
              xl={{
                width: '100%',
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SideScreen;
