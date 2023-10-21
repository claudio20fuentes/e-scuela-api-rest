import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Link,
  Button,
} from "@mui/material";

import PageContainer from "@containers/PageContainer";
import { backend_url as backendUrl } from "@variables";
import { TableComponent, SearchComponent } from "@components/tables/";

import axios from "axios";

const DocentesMainView = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/v1/profesores/`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const data = res.data.body;
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

  const parseData = (profesores) => {
    const rows = profesores.map((profesor) => {
      const { nombre, apellidos, correo } = profesor.userData;
      const { subjects, headTeacher } = profesor;
      const allSubjects = subjects.map((subject) => subject.nombre).join(", ");
      let headClass = headTeacher.map((classroom) => classroom?.nombreCurso);
      headClass = headClass.length > 0 ? headClass[0] : "No asignado";


      return {
        nombre: `${nombre} ${apellidos}`,
        correo,
        asignatura: allSubjects,
        jefatura: headClass,

      };
    });
    return rows;
  };

  return (
    <PageContainer title="Docentes" description="reports detail page">
      <Grid container justifyContent="space-between" pl={3} mb={2}>
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" fontWeight={500}>
            Listado de Docentes
          </Typography>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end" pr={2}>
          <Link href={`#/settings/company/user/create`} underline="none">
            <Button variant="contained">+ Agregar</Button>
          </Link>
        </Grid>
      </Grid>
      <Grid container>
        <TableComponent
          rows={parseData(data)}
          page={page}
          setPage={setPage}
          isLoading={isLoading}
          search={true}
          columnsOnMobile={2}
        />
      </Grid>
    </PageContainer>
  );
};

export default DocentesMainView;
