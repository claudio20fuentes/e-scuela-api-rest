import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
// import AsignaturasCursos from "./AsignaturasCursosComponent";

import { getMatricula } from "@services/cursosServices";
import { set } from "lodash";

const EditarEstudiante = () => {
  const [open, setOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [user, setUser] = useState({
    nombre: "",
    apellidos: "",
    rut: "",
    curso: {value: "", label: ""},
  });
  const { id } = useParams();

  const { handleSubmit } = useForm({
    mode: "onTouched",
  });

  const parser = (data) => {
    const { Estudiante, Curso } = data;
    return {
      nombre: Estudiante.nombre,
      apellidos: Estudiante.apellido,
      rut: Estudiante.rut,
      curso: {
        value: Curso.id,
        label: Curso.nombreCurso,
      }
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      const dataFetched = await getMatricula(id);
      if(dataFetched){
        const parsed = parser(dataFetched);
        setUser(parsed);
      }
    };
    fetchData();
  }, []);

  const onSubmit = async () => {
    try {
      // TODO handle submit in estudiante: [rut, nombre, apellido, idEscuela] then in matricula: [idEscuela, idEstudiante, idCurso]
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
          <Link href={`#/administration/matriculas`} underline="hover">
            <Typography fontSize="12px" color="#8F90A6">
              {`< Volver a Matículas`}
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={12} pl={3} mb={2}>
          <Typography variant="h3">Editar Estudiante</Typography>
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
                  href="#/administration/matriculas"
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

export default EditarEstudiante;
