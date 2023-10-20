import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';

import PageContainer from '@containers/PageContainer';
import { backend_url as backendUrl } from "@variables";
import TableComponent from '@components/dashboard-tables/TableComponent';
import axios from 'axios';

const DocentesMainView = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    axios.get(`${backendUrl}/api/v1/profesores/`, {
      headers: {
        authorization: 'Bearer ' + localStorage.getItem('token'),
        token: localStorage.getItem('token'),
      },
    })
      .then((res) => {
        const data = res.data.body;
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  const headCells = [
    {
      id: "",
      label: "",
    },
    {
      id: "token",
      label: "Nombre",
    },
    {
      id: "date",
      label: "Correo",
    },
    {
      id: "monto",
      label: "Asignatura",
    },
    {
      id: "prof_jefe",
      label: "Jefatura",
    },
  ];

  const parseData = (profesores) => {
    const rows = profesores.map((profesor) => {
      const { nombre, correo, asignatura, jefatura } = profesor;
      return {
        nombre,
        correo,
        asignatura,
        jefatura,
      };
    });
    return rows;
  }

  return (
    <PageContainer title='Docentes' description='reports detail page'>
      <Grid container justifyContent='space-between'>
        <Grid item xs={12} sm={6} sx={{ pl: 3, mb: 2 }}>
          <Typography variant='h2' fontWeight={500}>
            Listado de Docentes
          </Typography>
        </Grid>
      </Grid>
      <Grid container>
        <Card style={{ width: '100%' }}>
          <CardContent>
            <TableComponent headers={headCells} data={parseData(data)} page={page} setPage={setPage} isLoading={isLoading} />
          </CardContent>
        </Card>
      </Grid>
    </PageContainer>
  );
};

export default DocentesMainView;
