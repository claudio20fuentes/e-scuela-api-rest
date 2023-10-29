import { useState, useEffect } from "react";
import { Typography, Grid, Link, Button } from "@mui/material";

import PageContainer from "@containers/PageContainer";
import { TableComponent } from "@components/tables/";

import { getMatricula, getAllCursos } from "@services/cursosServices";

const CursosMainView = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const parseData = (cursos) => {
    const rows = cursos.map((curso) => {
      const { estudiantes, profesor, nombre } = curso;
      return {
        id: curso.idCurso,
        curso: nombre,
        matricula: estudiantes.length,
        ["profesor guía"]: `${profesor.nombre} ${profesor.apellidos}`,
        correo: profesor.correo,
        // estudiantes,
      };
    });
    return rows;
  };

  useEffect(() => {
    const fetchData = async () => {
      const cursos = await getAllCursos();
      setData(parseData(cursos));
      setIsLoading(false);
    }; 
    fetchData();
  }, []);

  return (
    <PageContainer title="Cursos" description="reports detail page">
      <Grid container justifyContent="space-between" pl={3} mb={2}>
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" fontWeight={500}>
            Listado de Cursos
          </Typography>
        </Grid>
        {/* <Grid item xs={12} display="flex" justifyContent="flex-end" pr={2}>
          <Link href={`#/administration/courses/create`} underline="none">
            <Button variant="contained">+ Agregar</Button>
          </Link>
        </Grid> */}
      </Grid>

      <Grid container>
        <TableComponent
          rows={data}
          setSelected={setSelected}
          edit={false}
          isLoading={isLoading}
          search={true}
          columnsOnMobile={3}
        />
      </Grid>
    </PageContainer>
  );
};

export default CursosMainView;
