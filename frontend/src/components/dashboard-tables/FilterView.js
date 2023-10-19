import CustomTextField from '../forms/custom-elements/CustomTextField';
import CustomFormLabel from '../forms/custom-elements/CustomFormLabel';
// import { experimentalStyled as styled } from '@mui/material/styles';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

import {
	Card,
	Grid,
	// InputBase,
	CardContent,
} from '@mui/material';


const PaymentsFilter = ({
	setSearch,
	// isLoading,
	startDate,
	setStartDate,
	endDate,
	setEndDate,
}) => {
  return (
    <Card style={{ width: '100%' }}>
      <CardContent>
        <Grid container rowSpacing={{ xs: 2, md: 1 }}>
          <Grid item xs={12} height='100%'>
            <CustomFormLabel
              htmlFor='outlined-multiline-static'
              style={{ marginTop: '0' }}>
              Buscar
            </CustomFormLabel>
            <CustomTextField
              id='outlined-search'
              placeholder='Todos'
              size='small'
              type='search'
              variant='outlined'
              inputProps={{ 'aria-label': 'Search Contacts' }}
              fullWidth
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>
          <Grid item container spacing={2} display='flex' justifyContent='space-between'>
            <Grid item xs={12} md={6}>
              <CustomFormLabel htmlFor='outlined-multiline-static'>
                Fecha Inicial
              </CustomFormLabel>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={es}>
                <DatePicker
                  views={['year', 'month', 'day']}
                  openTo='month'
                  onChange={setStartDate}
                  disableFuture
                  slotProps={{
                    textField: {
                      placeholder: 'Selecciona',
                      fullWidth: true,
                      size: 'small'
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFormLabel htmlFor='outlined-multiline-static'>
                Fecha Final
              </CustomFormLabel>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={es}>
                <DatePicker
                  views={['year', 'month', 'day']}
                  openTo='month'
                  value={endDate}
                  onChange={setEndDate}
                  disableFuture
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: 'small'
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PaymentsFilter;
