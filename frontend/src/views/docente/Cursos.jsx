import { useState, useEffect, useContext } from "react";
import { Typography, Grid, Link, Button } from "@mui/material";

import PageContainer from "@containers/PageContainer";
import { TableComponent } from "@components/tables/";

import { getCursosByProfesor } from "@services/cursosServices";
import { UserContext } from "@context/UserContext";

const CursosProfesor = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user: userData } = useContext(UserContext);

  useEffect(() => {
    const getData = async () => {
      const cursos = await getCursosByProfesor(userData.teacher);
      setData(cursos);
      setIsLoading(false);
    };
    getData();
  }, []);

  const parseData = (cursos) => {
    const rows = cursos.map((curso) => {
      const { estudiantes, profesor, nombre, totalMatriculas } = curso;

      return {
        id: curso.id,
        curso: nombre,
        matricula: totalMatriculas,
        ["profesor guía"]: `${profesor.nombre} ${profesor.apellidos}`,
        correo: profesor.correo,
        // estudiantes,
      };
    });

    return rows.sort((a, b) => a.curso.localeCompare(b.curso));
  };

  return (
    <PageContainer title="Cursos" description="reports detail page">
      <Grid container justifyContent="space-between" pl={3} mb={2}>
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" fontWeight={500}>
            Listado de Cursos
          </Typography>
        </Grid>
      </Grid>

      <Grid container>
        <TableComponent
          rows={parseData(data)}
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

export default CursosProfesor;
