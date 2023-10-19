import { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { backend_url } from '../../config/variables';

import axios from 'axios';
import PageContainer from '../container/PageContainer';
import { formatDate } from '../../utils/formatter.js';
import PaymentsFilter from './FilterView';
import PaymentsTable from './PaymentsTable';
import PaymentsStadistics from './OverviewComponent';

const PaymentsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allPayments, setAllPayments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState('');
  const [graphData, setGraphData] = useState({});
  const [page, setPage] = useState(0);
  const [startDate, setStartDate] = useState(false);
  const [endDate, setEndDate] = useState(new Date());
  const [total, setTotal] = useState(0);

  let actualDate = formatDate(new Date());

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${backend_url}/api/payments/all/0?to=${endDate}&from=${startDate}`, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token'),
          cliente: localStorage.getItem('cliente'),
        },
      })
      .then((res) => {
        const { data } = res;
        if (data.success) {
          setGraphData(data.body.counter);
          setPage(0);
          setPayments(data.body.payments);
          setAllPayments(data.body.payments);
          setIsLoading(false);
          setTotal(data.body.counter.total);
        }
      })
      .catch((err) => console.error(err));
  }, [endDate, startDate]);

  useEffect(() => {
    const filtered = allPayments.filter((payment) => {
      let response = true;
      const searchLC = search.toLowerCase();
      if (search) {
        const { token= '', id_consumer = '', step = '', status = '', sender, amount = '', transferType = '' } = payment;
        const bank = sender ? sender.bank : '';
        const accountType = sender ? sender.account_type : '';
        response =
          token.toLowerCase().includes(searchLC) ||
          id_consumer.toLowerCase().includes(searchLC) ||
          step.toLowerCase().includes(searchLC) ||
          status.toLowerCase().includes(searchLC) ||
          bank.toLowerCase().includes(searchLC) ||
          amount.toString().includes(searchLC) ||
          transferType.toLowerCase().includes(searchLC);
      } else {
        response = payment;
      }
      return response;
    });
    setPayments(filtered);
    setPage(0);
    setTotal(filtered.length);
  }, [search, startDate, endDate]);

  return (
    <PageContainer title='Payments' description='Payments details'>
      <Grid container>
        <Grid item xs={12} sm={6} sx={{ pl: 3, mb: 2 }}>
          <Typography variant='h2' fontWeight={500}>
            Transacciones
          </Typography>
          <Typography variant='h6' color='#99ABB4'>
            Fecha Última Actualización {actualDate}
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} sm={6} display='flex'>
          <PaymentsFilter
            isLoading={isLoading}
            setSearch={setSearch}
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
        </Grid>
        <Grid item xs={12} sm={6} display='flex'>
          <PaymentsStadistics isLoading={isLoading} data={graphData} />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <PaymentsTable
            search={search}
            isLoading={isLoading}
            payments={payments}
            total={total}
            page={page}
            setPage={setPage}
            setSearch={setSearch}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default PaymentsList;
