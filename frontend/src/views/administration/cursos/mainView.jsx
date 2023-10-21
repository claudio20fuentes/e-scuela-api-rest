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

const CursosMainView = () => {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        axios
          .get(`${backendUrl}/api/v1/cursos/`, {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
              token: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            const data = res.data.data;
            setData(data);
            setIsLoading(false);
          })
          .catch((err) => {
            if (err.response.status === 401) {
              localStorage.clear();
              window.location.reload();
            }
        })
      }, []);

      const parseData = (cursos) => {
        const rows = cursos.map((curso) => {
          const { courseData, teacherData } = curso;
          const { nombre, apellidos, movil, correo, idRol } = teacherData;

          return {
            curso: courseData.nombre,
            nombre: `${nombre} ${apellidos}`,
            movil,
            correo,
            idRol,
          };
        });

        return rows ;
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
                  <Link href={`#/settings/company/user/create`} underline="none">
                    <Button variant="contained" >
                      + Agregar
                    </Button>
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
                  columnsOnMobile={1}
                />
          </Grid>
        </PageContainer>
      );
};

export default CursosMainView;
