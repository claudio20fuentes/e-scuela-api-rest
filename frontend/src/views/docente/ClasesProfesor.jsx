import { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Link,
  Button,
} from "@mui/material";

import BloqueComponent from "./BloqueComponent";

import { getHorarioFromBloquesByDay } from "@services/profesoresServices";
import {
  getAsistencia,
  getAsistenciaByDay,
} from "@services/asistenciaServices";

import { UserContext } from "@context/UserContext";

const ClasesProfesor = ({ bloques, todayClasses, setTodayClasses, setTotalDiarios }) => {
  const [asistencia, setAsistencia] = useState([{}]);
  const [currentBloque, setCurrentBloque] = useState({});
  const { date } = useContext(UserContext);

  const parser = (cursos) => {
    if (!cursos) {
      return [];
    }
    return cursos.map((item) => {
      const idCurso = item.idCurso;
      const idsBloqueHora = item.bloques.map((bloque) => bloque.idBloqueHora);
      return {
        idCurso,
        idsBloqueHora,
      };
    });
  };

  function removeMatchingObjects(objects, attendanceLists) {
    const objectsToKeep = objects.filter((obj) => {
      const { idHora, curso } = obj;
      const idCursoToCheck = curso.id;

      const matchingList = attendanceLists.find((list) => {
        return (
          list.idCurso === idCursoToCheck && list.idsBloqueHora.includes(idHora)
        );
      });

      return !matchingList; // Keep the object if there is no matching list
    });

    return objectsToKeep;
  }

  useEffect(() => {
    const fetchData = async () => {
      const asistencia = await getAsistenciaByDay(new Date());
      setAsistencia(asistencia);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const bloquesDiarios = getHorarioFromBloquesByDay(bloques, date);
    setTotalDiarios(bloquesDiarios)
    const {
      currentBloque: current,
      todayClasses: today,
      horario,
    } = bloquesDiarios;
    const checked = parser(asistencia?.cursos);
    const unchecked = !today ? false : removeMatchingObjects(today, checked);
    setCurrentBloque(current);
    unchecked && setTodayClasses(unchecked);
    unchecked &&
      setCurrentBloque(
        unchecked.find((bloque) => bloque.idHora === current.idHora)
      );
  }, [asistencia]);

  return (
    <Grid container>
      {currentBloque && (
        <Grid item xs={12} mb={5}>
          <Typography variant="h3" fontWeight={500} ml={2} width="100%">
            Clase Actual
          </Typography>
          <BloqueComponent bloque={currentBloque} state={1} />
        </Grid>
      )}
      <Typography variant="h3" fontWeight={500} ml={2} width="100%">
        Clases de hoy
      </Typography>
      {todayClasses?.map((bloque, index) => {
        return (
          <Grid key={index} item display="flex" xs={12} md={6} lg={4}>
            <BloqueComponent bloque={bloque} state={0} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ClasesProfesor;
