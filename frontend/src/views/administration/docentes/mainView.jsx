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
        console.log(err);
      });
  }, []);

  const headCells = [
    {
      id: "nombre",
      label: "Nombre",
    },
    {
      id: "correo",
      label: "Correo",
    },
  ];

  const parseData = (profesores) => {
    const rows = profesores.map((profesor) => {
      const { nombre, apellidos, correo, asignatura, jefatura } = profesor;
      return {
        nombre: `${nombre} ${apellidos}`,
        correo,
      };
    });
    const collapsedContent = profesores.map((profesor) => {
      return {
        correo: profesor.correo,
        // asignatura: profesor.asignatura,
        // jefatura: profesor.jefatura,
      };
    });
    return { rows, collapsedContent };
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
};

export default DocentesMainView;
