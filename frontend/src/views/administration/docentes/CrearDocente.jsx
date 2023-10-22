import { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  Link,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { backend_url } from "@variables";
import axios from "axios";

import PageContainer from "@containers/PageContainer";

import DatosPersonales from "./DatosPersonalesComponent";
import AsignaturasCursos from "./AsignaturasCursosComponent";

import { getAllCursos } from "@services/cursosServices";

const CreateDocente = () => {
  const [open, setOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [user, setUser] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    movil: "",
    idRol: 3,
    subjects: [],
    classes: [],
    headTeacher: { state: false, classroom: {} },
  });

  const { handleSubmit } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    const fetchData = async () => {
      const dataFetched = await getAllCursos();
      setClasses(dataFetched);
    };
    fetchData();
  }, []);

  const onSubmit = async () => {
    try {
      await axios
        .put(
          `${backend_url}/api/usuario/update-user/${userData.id}`,
          { nombre: userName, celular: userPhone },
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
              cliente: localStorage.getItem("cliente"),
            },
          }
        )
        .then((res) => {
          setOpen(!open);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PageContainer title="Profile" description="User profile">
      <Grid container>
        <Grid item xs={12} pl={3} mb={1}>
          <Link href={`#/administration/teachers`} underline="hover">
            <Typography fontSize="12px" color="#8F90A6">
              {`< Volver a Docentes`}
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12} pl={3} mb={2}>
          <Typography variant="h3">Crear Docente</Typography>
        </Grid>
        <Grid item xs={12} md={8} display="flex">
          <Card style={{ width: "100%" }}>
            <CardContent>
              <Grid container gap={3}>
                <DatosPersonales
                  user={user}
                  setUser={setUser}
                  classes={classes}
                />
                <AsignaturasCursos
                  user={user}
                  setUser={setUser}
                  classes={classes}
                />
                <Divider width="100%" />
              </Grid>
              <Grid
                container
                display="flex"
                justifyContent="flex-end"
                gap={2}
                mt={4}
              >
                <Link
                  underline="none"
                  component={Button}
                  variant="outlined"
                  color="primary"
                  href="#/administration/teachers"
                >
                  Cancelar
                </Link>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(onSubmit)}
                >
                  Guardar cambios
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default CreateDocente;
