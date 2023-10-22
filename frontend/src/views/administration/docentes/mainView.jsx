import { useState, useEffect } from "react";
import {
  Typography,
  Grid,
  Link,
  Button,
} from "@mui/material";

import PageContainer from "@containers/PageContainer";
import { TableComponent } from "@components/tables/";

import { getAllProfesores } from "@services/profesoresServices";

const DocentesMainView = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const dataFetched = await getAllProfesores();
      setData(dataFetched);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const parseData = (profesores) => {
    const rows = profesores.map((profesor) => {
      const { nombre, apellidos, correo } = profesor.userData;
      const { subjects, headTeacher } = profesor;
      const allSubjects = subjects.map((subject) => subject.nombre).join(", ");
      let headClass = headTeacher.map((classroom) => classroom?.nombreCurso);
      headClass = headClass.length > 0 ? headClass[0] : "No asignado";

      return {
        nombre: `${nombre} ${apellidos}`,
        asignatura: allSubjects,
        jefatura: headClass,
        correo,
      };
    });
    return rows;
  };

  return (
    <PageContainer title="Docentes" description="reports detail page">
      <Grid container justifyContent="space-between" pl={3} mb={2}>
        <Grid item xs={12} mb={3}>
          <Typography variant="h2" fontWeight={500}>
            Listado de Docentes
          </Typography>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end" pr={2}>
          <Link href={`#/administration/teachers/create`} underline="none">
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

export default DocentesMainView;
