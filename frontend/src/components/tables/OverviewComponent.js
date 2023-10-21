import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Skeleton,
} from '@mui/material';
import Chart from 'react-apexcharts';

const PaymentsStadistics = ({ data, isLoading }) => {
  const { aceptado, rechazado, pendiente, iniciado, cancelado, total } = data;
  const optionsCount = [aceptado, rechazado, pendiente, iniciado, cancelado ];
  const labels = ['Aceptados', 'Iniciados', 'Pendientes', 'Cancelados', 'Rechazados'];
  const colors = ['#4EAF51', '#03C9D7', '#F7C947' , '#bfbfbf', '#F54336' ]
  const options = {
    labels: ['Aceptados', 'Iniciados', 'Pendientes', 'Cancelados', 'Rechazados'],
    chart: {
      height: 145,
      type: 'donut',
      foreColor: '#adb0bb',
      fontFamily: 'DM sans',
    },
    colors,
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      colors: ['transparent'],
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
          labels: {
            show: false,
            name: {
              show: true,
              fontSize: '18px',
              color: undefined,
              offsetY: -10,
            },
            value: {
              show: false,
              color: '#98aab4',
            },
            total: {
              show: false,
              label: 'Our Visitors',
              color: '#98aab4',
            },
          },
        },
      },
    },
    tooltip: {
      theme: 'dark',
      fillSeriesColor: false,
    },
  };

  return isLoading ? (
    <Grid container alignItems='center'>
      <Grid item xs={12} display='flex'>
        <Card style={{ width: '100%' }}>
          <Grid container justifyContent='center' spacing={5}>
            <Grid item xs={12} md={6} display='flex' alignItems='center'>
              <Skeleton variant='rounded' width={200} height={205} />
            </Grid>
            <Grid item xs={12} md={6} display='flex' alignItems='center'>
              <Skeleton variant='circular' width={150} height={150} />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  ) : (
    <Card>
      <CardContent>
        <Grid container alignItems='center'>
          <Grid item xs={12} md={6} display='flex'>
            <Grid container>
              <Grid item xs={12} display='flex' mb={3}>
                <Typography
                  component='span'
                  variant='h3'
                  color='textPrimary'
                  fontWeight='500'
                  sx={{
                    mr: 1,
                  }}>
                  {`${total} Transacciones`}
                </Typography>
              </Grid>
              {
                optionsCount.map((item, index) => (
                  <Grid key={index} item xs={12} display='flex' alignItems='center'>
                    <Box
                      sx={{
                        backgroundColor: colors[index],
                        borderRadius: '50%',
                        height: 12,
                        width: 12,
                        mr: 1,
                      }}
                    />
                    <Typography
                      color='textSecondary'
                      variant='body2'
                      fontWeight='400'>
                      {item}{' '}{labels[index]}
                    </Typography>
                  </Grid>
                ))
              }
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} display='flex' justifyContent='center'>
            <Chart
              options={options}
              series={optionsCount}
              type='donut'
              height='177px'
              width='177px'
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PaymentsStadistics;
