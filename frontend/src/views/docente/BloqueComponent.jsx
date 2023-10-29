import { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Link,
} from "@mui/material";

const BloqueComponent = ({ bloque = {}, state = 0 }) => {

  const none = { width: "100%" };
  const current = { width: "100%", backgroundColor: "#EFFEFF", color: "#18c0ce" };
  const pending = { width: "100%", backgroundColor: "#fdc4cc", color: "#f50007" };
  const success = { width: "100%", backgroundColor: "#E6F3E5", color: "#4EAF51" };

  const style = state == 0 ? none : state == 1 ? current : state == 2 ? success : pending;

  return (
    <>
      <Grid item display="flex" xs={12} >
        <Link underline="none" display="contents" href={`#/attendance/${bloque?.id}`}>
          <Card style={style}>
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
                    {bloque?.asignatura?.value}
                  </Typography>
                  <Typography variant="h6" fontWeight={500}>
                    {bloque?.curso?.value}
                  </Typography>
                </Grid>
                <Grid item display="grid" justifyItems="flex-start">
                  <Typography variant="h4" fontWeight={500}>
                    Bloque: {bloque?.idHora}
                  </Typography>
                  <Typography variant="h6" fontWeight={500}>
                    {bloque?.horaInicio?.slice(0, -3)} -{" "}
                    {bloque?.horaFin?.slice(0, -3)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Link>
      </Grid>
    </>
  );
};

export default BloqueComponent;
