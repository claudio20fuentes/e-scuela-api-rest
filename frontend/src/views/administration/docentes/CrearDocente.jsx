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

const CreateDocente = () => {
  const [open, setOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [classes, setClasses] = useState([]);
  const [user, setUser] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    movil: "",
    idRol: 2,
    subjects: [],
    classes: [],
    headTeacher: { state: false, class: {} },
  });

  const { handleSubmit } = useForm({
    mode: "onTouched",
  });

  // TODO: call ASIGNATURAS and get them all

  // TODO: call CURSOS and get them all

  const asignaturas = [
    { value: 1, label: "Matemática" },
    { value: 2, label: "Lenguaje" },
    { value: 3, label: "Historia" },
    { value: 4, label: "Ciencias" },
  ];

  const cursos = [
    { value: 1, label: "1 Básico" },
    { value: 2, label: "2 Básico" },
    { value: 3, label: "3 Básico" },
    { value: 4, label: "4 Básico" },
    { value: 5, label: "5 Básico" },
    { value: 6, label: "6 Básico" },
    { value: 7, label: "7 Básico" },
    { value: 8, label: "8 Básico" },
  ];

  useEffect(() => {
    setSubjects(asignaturas);
    setClasses(cursos);
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

  console.log(user);
  return (
    <PageContainer title="Profile" description="User profile">
      <Grid container>
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
                <Divider width="100%" />
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
