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
import TableComponent from "@components/dashboard-tables/TableComponent";

import FeatherIcon from "feather-icons-react";
import axios from "axios";

const CursosMainView = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);

    useEffect(() => {
        axios
          .get(`${backendUrl}/api/v1/cursos/`, {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
              token: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            console.log(res.data.data);
            const data = res.data.data;
            setData(data);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);

      const headCells = [
        {
          id: "nombreCurso",
          label: "Curso",
        },

      ];

      const parseData = (cursos) => {
        const rows = cursos.map((curso) => {
          const { nombreCurso } = curso;
          return {
            nombre: `${nombreCurso}`
          };
        });
        const collapsedContent = cursos.map((curso) => {
          return {
            curso: curso.nombreCurso,
            // asignatura: profesor.asignatura,
            // jefatura: profesor.jefatura,
          };
        });
        return { rows, collapsedContent };
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
            <Card style={{ width: "100%", padding: "0" }}>
              <CardContent style={{ paddingBottom: 0}}>
                <TableComponent
                  headers={headCells}
                  data={parseData(data).rows}
                  collapsedContent={parseData(data).collapsedContent}
                  page={page}
                  setPage={setPage}
                  isLoading={isLoading}
                />
              </CardContent>
            </Card>
          </Grid>
        </PageContainer>
      );
}

export default CursosMainView;
