import { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Link,
  Button,
} from "@mui/material";

import PageContainer from "@containers/PageContainer";
import { TableComponent } from "@components/tables/";
import { getMatricula } from "@services/cursosServices";


const MatriculaMainView = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const cursos = await getMatricula();
      setData(cursos);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const parseData = (matriculas) => {
    const rows = matriculas.map((matricula) => {
      const { nombre, apellido, rut } = matricula.estudiantes;
      const { fecha, id } = matricula.matricula;
      const Fecha = new Date(fecha);

      return {
        curso: matricula.curso.nombre,
        nombre: `${nombre} ${apellido}`,
        rut: rut,
        ["fecha de ingreso"]: new Date(fecha).toLocaleDateString('en-GB'),
        ["N° Matricula"]: id,
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
          <Link href={`#/administration/matriculas`} underline="none">
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
