import { useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Link,
  Button,
} from "@mui/material";

import ClaseActual from "./ClaseActual";

import { getHorarioFromBloquesByDay } from "@services/profesoresServices";

import { UserContext } from "@context/UserContext";

const ClasesProfesor = ({ bloques }) => {
  const { date } = useContext(UserContext);
  const bloquesDiarios = getHorarioFromBloquesByDay(bloques, date);
  const { currentBloque, todayClasses, horario } = bloquesDiarios;

  console.log(todayClasses)

  return (
    <Grid container>
      {currentBloque && <ClaseActual bloque={currentBloque} />}
      <Typography variant="h3" fontWeight={500} ml={2} width="100%">
        Clases de hoy
      </Typography>
      {todayClasses?.map((bloque, index) => {
        const current = currentBloque === bloque.idHora;
        return (
          <Grid key={index} item display="flex" xs={12} md={6} lg={4}>
            <Card style={{ width: "100%" }}>
              <CardContent>
                <Grid
                  container
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flexDirection="row-reverse"
                >
                  <Grid item>
                    <Typography variant="h3" fontWeight={500}>
                      {bloque.asignatura.value}
                    </Typography>
                    <Typography variant="h6" fontWeight={500}>
                      {bloque.curso.value}
                    </Typography>
                  </Grid>
                  <Grid item display="grid" justifyItems="flex-start">
                    <Typography variant="h4" fontWeight={500}>
                      Bloque: {bloque.idHora}
                    </Typography>
                    <Typography variant="h6" fontWeight={500}>
                      {bloque.horaInicio?.slice(0, -3)} -{" "}
                      {bloque.horaFin?.slice(0, -3)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ClasesProfesor;
