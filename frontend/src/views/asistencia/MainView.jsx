import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Card, CardContent, Typography, Grid, Button } from "@mui/material";
import { getCursoByBloqueId } from "@services/cursosServices";
import EstudianteCard from "./EstudianteCard";
import DatosBloque from "./DatosBloque";
import Spinner from "@views/spinner/Spinner";

// STYLES

const itemStyle = {
  width: { xs: "100%", sm: "auto" },
  flexDirection: { xs: "row", sm: "column" },
  gap: 2,
  lineHeight: { xs: "28px", sm: 1 },
  alignItems: "center",
  display: "flex",
};

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

  // HANDLES
  const handleSubmit = () => {
    console.log("click");
  };

  const handleStudentStatus = (
    { idMatricula, nombre, apellido },
    statusKey
  ) => {
    setAsistencia((prevAsistencia) => {
      // Copy the previous state
      const updatedAsistencia = { ...prevAsistencia };

      // Remove the student from any previous status
      Object.keys(updatedAsistencia).forEach((key) => {
        if (key !== statusKey) {
          updatedAsistencia[key] = updatedAsistencia[key].filter(
            (student) => student.idMatricula !== idMatricula
          );
        }
      });

      // Find the student in the current status
      const studentInStatus = updatedAsistencia[statusKey].find(
        (student) => student.idMatricula === idMatricula
      );

      // If the student is not in the current status, add them
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
        <Button variant="contained" onClick={() => handleSubmit()}>
          Registrar
        </Button>
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
    </Grid>
  );
};

export default AsistenciaMainView;
