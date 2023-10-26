import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import { getCursoByBloqueId } from "@services/cursosServices";
import EstudianteCard from "./EstudianteCard";
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

const DatosBloque = ({datosBloque, isloading}) => {

  return isloading ? (
    <Spinner />
  ) : (
    <Grid container>
      <Card style={{ width: "100%" }}>
        <CardContent style={{ paddingBottom: "16px" }}>
          <Grid
            container
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid item sx={itemStyle}>
              <Typography variant="p" fontWeight={700}>
                Curso:
              </Typography>
              <Typography variant="p" fontWeight={500}>
                {datosBloque.curso.nombre}
              </Typography>
            </Grid>
            <Grid item sx={itemStyle}>
              <Typography variant="p" fontWeight={700}>
                Asignatura:
              </Typography>
              <Typography variant="p" fontWeight={500}>
                {datosBloque.asignatura.nombre}
              </Typography>
            </Grid>
            <Grid item sx={itemStyle}>
              <Typography variant="p" fontWeight={700}>
                Profesor:
              </Typography>
              <Typography variant="p" fontWeight={500}>
                {`${datosBloque.profesor.nombre} ${datosBloque.profesor.apellido}`}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default DatosBloque;
