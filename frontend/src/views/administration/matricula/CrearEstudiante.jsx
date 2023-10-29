import { useState, useEffect, useContext } from "react";
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

import { UserContext } from "@context/UserContext";

import PageContainer from "@containers/PageContainer";
import DatosPersonales from "./DatosPersonalesComponent";
import { getMatricula, createMatricula } from "@services/cursosServices";

const CreateEstudiante = () => {
  const { setSuccess } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [classes, setClasses] = useState([]);
  const [user, setUser] = useState({
    nombre: "",
    apellidos: "",
    rut: "",
    curso: { value: 0, label: "" },
  });
  const [userCheck, setUserCheck] = useState(false);

  const { handleSubmit } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    const fetchData = async () => {
      const dataFetched = await getMatricula();
      setClasses(dataFetched);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (user.nombre && user.apellidos && user.rut && user.curso.value) {
      setUserCheck(true);
    } else {
      setUserCheck(false);
    }
  }, [user]);

  const onSubmit = async () => {
    try {
      const response = createMatricula(user);
      if (response) {
        setSuccess({
          estado: true,
          message: "Estudiante creado con éxito",
        });
        window.location.href = "#/administration/matriculas";
      }
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
          <Typography variant="h3">Nueva Matrícula</Typography>
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
                  disabled={!userCheck}
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

export default CreateEstudiante;
