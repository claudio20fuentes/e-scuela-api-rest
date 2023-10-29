import { useContext, useEffect, useState } from "react";
import { Typography, Grid } from "@mui/material";

import CongratulationsCard from "@views/dashboards/CongratulationsCard";
import BloqueComponent from "./BloqueComponent";

import { getHorarioFromBloquesByDay } from "@services/profesoresServices";
import { getAsistenciaByDay } from "@services/asistenciaServices";

import { UserContext } from "@context/UserContext";

const ClasesProfesor = ({
  bloques,
  todayClasses,
  setTodayClasses,
  setTotalDiarios,
}) => {
  const [asistencia, setAsistencia] = useState([{}]);
  const [currentBloque, setCurrentBloque] = useState({});
  const { date } = useContext(UserContext);

  const parser = (asistencia =[], today =[]) => {
    if (!today?.length) {
      return { checked: [], unchecked: [] };
    }

    const response = today.map((bloque) => {
      let check = false;
      const match = asistencia.find(
        (curso) => curso.idCurso === bloque.curso.id
      );
      if (match) {
        const checked = match.bloques.find(
          (bloqueAsistencia) => bloqueAsistencia.idBloqueHora === bloque.idHora
        );
        if (checked) {
          check = true;
        }
      }
      return { ...bloque, check };
    });

    const checked = response.filter((bloque) => bloque.check);
    const unchecked = response.filter((bloque) => !bloque.check);
    return { checked, unchecked };
  };

  useEffect(() => {
    const fetchData = async () => {
      const asistencia = await getAsistenciaByDay(date.date);
      setAsistencia(asistencia);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const bloquesDiarios = getHorarioFromBloquesByDay(bloques, date);
    const { currentBloque: current, todayClasses: today } = bloquesDiarios;
    const { checked, unchecked } = parser(asistencia[0]?.cursos, today);
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
      {!todayClasses.length ? (
        <CongratulationsCard />
      ) : (
        <>
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
        </>
      )}
    </Grid>
  );
};

export default ClasesProfesor;
