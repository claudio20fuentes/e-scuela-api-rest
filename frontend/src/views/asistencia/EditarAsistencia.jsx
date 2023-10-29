import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Link,
  Alert,
} from "@mui/material";
import EditarTable from "./EditarAsistenciaTable";
import DatosBloque from "./DatosBloque";

import FeatherIcon from "feather-icons-react";
import Spinner from "@views/spinner/Spinner";

import { getCursoByBloqueId } from "@services/cursosServices";
import { getAsistenciaByCursoClass, updateDetalleAsistencia } from "@services/asistenciaServices";

import { UserContext } from "@context/UserContext";

const EditarAsistencia = () => {
  const { setSuccess, date } = useContext(UserContext);
  const { id: idBloque } = useParams();
  const [datosBloque, setDatosBloque] = useState({
    curso: { nombre: "", id: "" },
    profesor: { nombre: "", apellido: "" },
    asignatura: { nombre: "", id: "" },
  });
  const [asistencia, setAsistencia] = useState({
    todos: [],
    presentes: [],
    ausentes: [],
    atrasados: [],
  });
  const [asistenciaId, setAsistenciaId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // HANDLERS

  const handleSubmit = () => {
    const update = updateDetalleAsistencia({
      id: asistenciaId,
      asistencia: asistencia.todos,
    });

    if (update) {
      setSuccess({ estado: true, message: "Asistencia actualizada con éxito" });
      window.location.href = "#/";
    }
  };

  const handleStudentStatus = (
    { idMatricula, nombre, apellido, idDetalle },
    statusKey
  ) => {
    let estado;

    switch (statusKey) {
      case "presentes":
        estado = 1;
        break;
      case "ausentes":
        estado = 2;
        break;
      case "atrasados":
        estado = 3;
        break;
      default:
        estado = 0;
    }

    setAsistencia((prevAsistencia) => {
      const updatedAsistencia = { ...prevAsistencia };

      // Update the "estado" value
      estado = estado || 1; // Default to 1 if no statusKey matches
      const updatedStudent = {
        idMatricula,
        nombre,
        apellido,
        estado,
        idDetalle,
      };

      // Remove the student from all status keys
      Object.keys(updatedAsistencia).forEach((key) => {
        updatedAsistencia[key] = updatedAsistencia[key].filter(
          (student) => student.idMatricula !== idMatricula
        );
      });

      // Add the student to the specified status key
      updatedAsistencia[statusKey] = [
        ...updatedAsistencia[statusKey],
        updatedStudent,
      ];

      // Replace the "todos" key with all students
      const allStudents = [
        ...updatedAsistencia.presentes,
        ...updatedAsistencia.ausentes,
        ...updatedAsistencia.atrasados,
      ];
      updatedAsistencia.todos = allStudents;

      return updatedAsistencia;
    });
  };

  useEffect(() => {
    if (date.date != "") {
      const fetchData = async () => {
        const bloqueCompleto = await getCursoByBloqueId(idBloque);
        const asistenciaTotal = await getAsistenciaByCursoClass(idBloque, date);
        setAsistencia(asistenciaTotal.detalles);
        setDatosBloque(bloqueCompleto);
        setAsistenciaId(asistenciaTotal.idAsistencia);
      };
      fetchData();
    }
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <Grid container>
      <Grid item xs={12} mr={2} display="flex" justifyContent="space-between">
        <Typography variant="h3" fontWeight={500} ml={2} width="100%">
          Editar Asistencia
        </Typography>
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="flex-end" pr={2}>
        <Button variant="contained" onClick={handleSubmit}>
          Aceptar
        </Button>
      </Grid>
      <DatosBloque datosBloque={datosBloque} isloading={isLoading} />
      {/* STUDENT COMPONENT*/}
      <Grid container>
        <EditarTable
          handleStudentStatus={handleStudentStatus}
          asistencia={asistencia}
          setAsistencia={setAsistencia}
        />
      </Grid>
    </Grid>
  );
};

export default EditarAsistencia;
