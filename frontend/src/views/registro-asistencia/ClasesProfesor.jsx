import { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Link,
  Button,
} from "@mui/material";

import { TableComponent } from "@components/tables/";
import ClaseActual from "./ClaseActual";

import { formatDate } from "@utils/formatter";
import { UserContext } from "@context/UserContext";

import { getAllProfesores } from "@services/profesoresServices";
import { getAllBloques } from "@services/bloquesServices";

const ClasesProfesor = ({ horario, date }) => {
  const todayClasses = horario
    .find((dia) => dia.id === date.day)
    .bloques.sort((a, b) => a.idHorario - b.idHorario);

  // TODO: Change this to the current time
  const dateTime = "10:00:00";

  // Gets current bloque or 0 if there is no current bloque
  const currentBloque =
    todayClasses.find(
      (bloque) => bloque.horaInicio < dateTime && bloque.horaFin > dateTime
    ) || false;

  return (
    <Grid container>
      {currentBloque && <ClaseActual bloque={currentBloque} />}
      <Typography variant="h3" fontWeight={500} ml={2} width="100%">
        Clases de hoy
      </Typography>
      {todayClasses.map((bloque, index) => {
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
