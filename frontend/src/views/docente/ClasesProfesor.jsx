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
import { getAsistencia } from "@services/asistenciaServices";

import { UserContext } from "@context/UserContext";

const ClasesProfesor = ({ bloques }) => {
  const [asistencia, setAsistencia] = useState([{}]);
  const { date } = useContext(UserContext);
  const bloquesDiarios = getHorarioFromBloquesByDay(bloques, date);
  const { currentBloque, todayClasses, horario } = bloquesDiarios;

  useEffect(() => {
    const fetchData = async () => {
      const asistencia = await getAsistencia();
      setAsistencia(asistencia);
    };
    fetchData();
  }, []);

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
