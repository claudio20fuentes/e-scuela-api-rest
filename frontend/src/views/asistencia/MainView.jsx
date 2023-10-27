import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Alert,
} from "@mui/material";
import EstudianteCard from "./EstudianteCard";
import DatosBloque from "./DatosBloque";

import FeatherIcon from "feather-icons-react";
import Spinner from "@views/spinner/Spinner";

import { getCursoByBloqueId } from "@services/cursosServices";
import { createAsistencia } from "@services/asistenciaServices";

import { UserContext } from "@context/UserContext";

const AsistenciaMainView = () => {
  const [datosBloque, setDatosBloque] = useState({
    curso: { nombre: "", id: "" },
    profesor: { nombre: "", apellido: "" },
    asignatura: { nombre: "", id: "" },
  });
  const [estudiantes, setEstudiantes] = useState([]);
  const [asistencia, setAsistencia] = useState({
    restantes: [],
    presentes: [],
    ausentes: [],
    atrasados: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const { id: idBloque } = useParams();
  const { success, setSuccess } = useContext(UserContext);

  // HANDLERS

  function parseData(data, estadosArray) {
    const parsedArray = [];

    for (const estado of estadosArray) {
      if (data[estado]) {
        for (const student of data[estado]) {
          parsedArray.push({
            idMatricula: student.idMatricula,
            estado: estadosArray.indexOf(estado),
          });
        }
      }
    }

    return parsedArray;
  }

  const handleSubmit = () => {
    const estadosArray = Object.keys(asistencia);
    const asistenciaParsed = parseData(asistencia, estadosArray);

    const asistenciaCreated = createAsistencia({
      idBloque,
      asistencia: asistenciaParsed,
    });
    if (asistenciaCreated) {
      setSuccess({ estado: true, message: "Asistencia registrada con éxito" });
      window.location.href = "#/";
    }
  };

  const handleStudentStatus = (
    { idMatricula, nombre, apellido },
    statusKey
  ) => {
    setAsistencia((prevAsistencia) => {
      const updatedAsistencia = { ...prevAsistencia };
      Object.keys(updatedAsistencia).forEach((key) => {
        if (key !== statusKey) {
          updatedAsistencia[key] = updatedAsistencia[key].filter(
            (student) => student.idMatricula !== idMatricula
          );
        }
      });
      const studentInStatus = updatedAsistencia[statusKey].find(
        (student) => student.idMatricula === idMatricula
      );
      if (!studentInStatus) {
        updatedAsistencia[statusKey] = [
          ...updatedAsistencia[statusKey],
          { idMatricula, nombre, apellido },
        ];
      }
      return updatedAsistencia;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const bloqueCompleto = await getCursoByBloqueId(idBloque);
      setDatosBloque(bloqueCompleto);
      setEstudiantes(bloqueCompleto?.curso?.estudiantes);
    };
    fetchData();
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <Grid container>
      <Grid item xs={12} mr={2} display="flex" justifyContent="space-between">
        <Typography variant="h3" fontWeight={500} ml={2} width="100%">
          Clase Actual
        </Typography>
      </Grid>
      <DatosBloque datosBloque={datosBloque} isloading={isLoading} />
      {/* STUDENT COMPONENT*/}
      <Grid container>
        <EstudianteCard
          estudiantes={estudiantes}
          asistencia={asistencia}
          handleStudentStatus={handleStudentStatus}
          setAsistencia={setAsistencia}
        />
      </Grid>
      {asistencia.restantes.length === 0 && (
        <Grid container justifyContent="center" mt={4} mb={4}>
          <Grid item xs={11} md={4} display="flex" justifyContent="center">
            <Card
              sx={{
                py: 1,
                pr: 5,
                backgroundColor: (theme) => theme.palette.secondary.main,
                color: "white",
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.secondary.main,
                },
                transition: "background-image 0.3s ease",
              }}
              component={Button}
              onClick={handleSubmit}
              disabled={success.estado}
              endIcon={<FeatherIcon icon="check-circle" size="40px" />}
            >
              <CardContent sx={{ height: "100%" }}>
                <Typography variant="h3">Registrar Asistencia</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default AsistenciaMainView;
