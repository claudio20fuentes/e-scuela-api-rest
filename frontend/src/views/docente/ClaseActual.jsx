import { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";

const ClaseActual = ({ bloque }) => {
  return (
    <>
      <Typography variant="h3" fontWeight={500} ml={2}>
        Clases Actual
      </Typography>
      <Grid item display="flex" xs={12} mb={5}>
        <Card style={{ width: "100%", backgroundColor: "#fca49d" }}>
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
    </>
  );
};

export default ClaseActual;
