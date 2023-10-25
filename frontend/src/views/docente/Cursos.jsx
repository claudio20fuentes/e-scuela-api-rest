import { useState, useEffect } from "react";
import { Typography, Grid, Link, Button } from "@mui/material";

import PageContainer from "@containers/PageContainer";
import { TableComponent } from "@components/tables/";

import { getCursosByProfesor } from "@services/cursosServices";
import { UserContext } from "@context/UserContext";


const CursosProfesor = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const cursos = await getCursosByProfesor();
      setData(cursos);
      setIsLoading(false);
    };

    getData();
  }, []);

  console.log(data)

  const parseData = (cursos) => {
    const rows = cursos.map((curso) => {
      const { courseData, teacherData, totalMatriculas } = curso;
      const { nombre, apellidos, movil, correo, idRol } = teacherData;

      return {
        curso: courseData.nombre,
        Matriculas: totalMatriculas,
        nombre: `${nombre} ${apellidos}`,
        movil,
        correo,
        idRol,
      };
    });

    return rows;
  };

  return (
    <PageContainer title="Cursos" description="reports detail page">
      <Grid container justifyContent="space-between" pl={3} mb={2}>
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" fontWeight={500}>
            Listado de Cursos
          </Typography>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end" pr={2}>
          <Link href={`#/administration/courses/create`} underline="none">
            <Button variant="contained">+ Agregar</Button>
          </Link>
        </Grid>
      </Grid>

      <Grid container>
        <TableComponent
          rows={parseData(data)}
          setSelected={setSelected}
          edit={false}
          isLoading={isLoading}
          search={true}
          columnsOnMobile={2}
        />
      </Grid>
    </PageContainer>
  );
};

export default CursosProfesor;
