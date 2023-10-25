import { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Link,
  Button,
} from "@mui/material";

import PageContainer from "@containers/PageContainer";
import { backend_url as backendUrl } from "@variables";
import { TableComponent } from "@components/tables/";

import axios from "axios";

const MatriculaMainView = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/v1/matriculas/`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const data = res.data.body;
        console.log(data);
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          localStorage.clear();
          window.location.reload();
        }
      });
  }, []);

  const parseData = (matriculas) => {
    const rows = matriculas.map((matricula) => {
      const { nombre, apellido, rut } = matricula.estudiantes;
      const { fecha, id } = matricula.matricula;
      const Fecha = new Date(fecha);

      return {
        nMatricula: id,
        Rut: rut,
        nombre: `${nombre} ${apellido}`,
        Fecha: `${Fecha.getFullYear()}/${Fecha.getMonth()}/${Fecha.getDay()}`
      };
    });
    return rows;
  };

  return (
    <PageContainer title="Matriculas" description="reports detail page">
      <Grid container justifyContent="space-between" pl={3} mb={2}>
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" fontWeight={500}>
            Matrículas
          </Typography>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end" pr={2}>
          <Link href={`#/administration/matriculas/create`} underline="none">
            <Button variant="contained">+ Agregar</Button>
          </Link>
        </Grid>
      </Grid>
      <Grid container>
        <TableComponent
          rows={parseData(data)}
          setSelected={setSelected}
          edit={true}
          isLoading={isLoading}
          search={true}
          columnsOnMobile={2}
        />
      </Grid>
    </PageContainer>
  );
};

export default MatriculaMainView;
