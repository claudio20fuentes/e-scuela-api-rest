import { useState, useEffect } from 'react';
import { Grid, Button } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';


import { backend_url } from '../../config/variables';
import axios from 'axios';
import PageContainer from '../../components/container/PageContainer';

const Dashboard1 = () => {



  return (
    <PageContainer
      title='E-scuela Dashboard'
      description='this is Analytical Dashboard'>
        dashboard apoderado
    </PageContainer>
  );
};
export default Dashboard1;
