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
import AsignaturasCursos from "./AsignaturasCursosComponent";

import { getOneProfesor } from "@services/profesoresServices";

const EditarDocente = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [user, setUser] = useState({
    nombre: "",
    apellidos: "",
    correo: "",
    movil: "",
    idRol: 3,
    subjects: [],
    classes: [],
    headTeacher: { state: false, class: {} },
  });

  const { handleSubmit } = useForm({
    mode: "onTouched",
  });

  const parseAtribute = (data) => {
    const response = data.map((atribute) => {
      const { nombre, id } = atribute;
      return { value: id, label: nombre };
    });
    return response.sort((a, b) => a.value - b.value);
  };

  const parseData = (profesor) => {
    const { nombre, apellidos, correo, idRol, movil } = profesor.userData;
    const { subjects, headTeacher, cursos } = profesor;
    const parsedSubjects = parseAtribute(subjects);
    const parsedClasses = parseAtribute(cursos);

    const [parsedHeadTeacher] = headTeacher.map((el) => {
      const state = headTeacher.length > 0;
      const { id, nombreCurso } = el;
      return { state, classroom: { value: id, label: nombreCurso } };
    });

    const response = {
      nombre,
      apellidos,
      correo,
      movil,
      subjects: parsedSubjects,
      classes: parsedClasses,
      headTeacher: parsedHeadTeacher,
      idRol,
    };
    return response;
  };

  useEffect(() => {
    const fetchData = async () => {
      const profesor = await getOneProfesor(id);
      setUser(parseData(profesor));
    };
    fetchData();
    setIsLoading(false);
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
          <Typography variant="h3">Editar Docente</Typography>
        </Grid>
        <Grid item xs={12} md={8} display="flex">
          <Card style={{ width: "100%" }}>
            <CardContent>
              <Grid container gap={3}>
                <DatosPersonales user={user} setUser={setUser} />
                <AsignaturasCursos user={user} setUser={setUser} />
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

export default EditarDocente;
