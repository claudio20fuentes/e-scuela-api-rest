import { useState, useEffect, useContext } from "react";
import { Typography, Grid, Link, Button } from "@mui/material";

import PageContainer from "@containers/PageContainer";
import { TableComponent } from "@components/tables/";

import { formatDate } from "@utils/formatter";
import { UserContext } from "@context/UserContext";

import { getAllProfesores } from "@services/profesoresServices";
import { getAllBloques } from "@services/bloquesServices";

const DocentesMainView = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [date, setDate] = useState(formatDate(new Date()));
  const [isLoading, setIsLoading] = useState(true);

  // USER CONTEXT

  const { user: userData } = useContext(UserContext);

  // DEPENDING ON THE ROLE, THE USER WILL BE ABLE TO SEE DIFFERENT COLUMNS

  // DATA FETCHING
  useEffect(() => {
    const fetchData = async () => {
      const dataFetched = await getAllProfesores();
      const bloques = await getAllBloques();
      console.log(bloques)
      setData(dataFetched);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  console.log(userData)
  // REDIRECT TO PAGE WHEN BUTTON IS PRESSED
  useEffect(() => {
    if (selected.length > 0) {
      const id = selected[0];
      window.location.href = `#/administration/teachers/${id}`;
    }
  }, [selected]);

  // DATA PARSING TO FIT TABLE COMPONENT
  const parseData = (profesores) => {
    const rows = profesores.map((profesor) => {
      const { nombre, apellidos, correo } = profesor.userData;
      const { id, subjects, headTeacher } = profesor;
      const allSubjects = subjects.map((subject) => subject.nombre).join(", ");
      let headClass = headTeacher.map((classroom) => classroom?.nombreCurso);
      headClass = headClass.length > 0 ? headClass[0] : "No asignado";

      return {
        id,
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
            Registro de Asistencia
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
          optionIcon={"edit"}
          isLoading={isLoading}
          search={true}
          columnsOnMobile={3}
        />
      </Grid>
    </PageContainer>
  );
};

export default DocentesMainView;
