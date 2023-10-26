import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import { Card, Button, CardContent, Typography, Grid, Fab } from "@mui/material";
import FeatherIcon from "feather-icons-react";
import { capitalize } from "@utils/formatter";

import Spinner from "@views/spinner/Spinner";

const useStyles = {
  circularButton: {
    borderRadius: "50%", // Make the button circular
    width: "60px", // Adjust the size as needed
    height: "60px", // Adjust the size as needed
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const AsistenciaMainView = ({ estudiantes = [], handleStudentStatus, asistencia }) => {
  const [selectedButton, setSelectedButton] = useState('restantes');

  useEffect(() => {
    setSelectedButton('restantes');
  }
  , [estudiantes]);

  const pending = [
    ...estudiantes.sort((a, b) => a.apellido.localeCompare(b.apellido, "es")),
  ];
  const done = [];

  // HANDLER

  const RoundButton = ({
    color = { backgroundColor: "primary", color: "white" },
    icon = "",
    onClick,
  }) => (
    <Grid item>
      <Fab
        // component={NavLink}
        size="small"
        aria-label="add"
        style={{
          backgroundColor: color.backgroundColor,
          color: color.color,
        }}
        onClick={onClick}
      >
        {<FeatherIcon icon={icon} />}
      </Fab>
    </Grid>
  );

  const buttons = [
    "restantes",
    "presentes",
    "ausentes",
    "atrasados",
  ]

  console.log(asistencia["presentes"]?.length)
  return (
    <Grid container>
      <Grid container style={{ borderBottom: "1px solid #8F90A6" }} mx={2}>
        {buttons.map((button, index) => {
          let total = asistencia[button]?.length || 0;
          if (button === "restantes") {
            total = estudiantes.length - asistencia["presentes"]?.length - asistencia["ausentes"]?.length - asistencia["atrasados"]?.length;
          }
          return (
            <Button
              key={index}
              sx={{
                color: selectedButton === button ? "primary" : "#8F90A6",
                fontWeight: selectedButton === button ? 700 : 400,
                borderRadius: 0,
                width: "25%",
                borderBottom:
                  selectedButton === button ? "2px solid #00A693" : "none",
              }}
              onClick={() => handleClick(button)}
            >
              {`${capitalize(button)} (${total})`}
            </Button>
          )
        })}
      </Grid>
      {pending.map((estudiante, index) => (
        <Grid key={index} item display="flex" xs={12} sm={6} md={4} xl={3}>
          <Card style={{ width: "100%" }}>
            <CardContent style={{ paddingBottom: "16px", paddingLeft: 0 }}>
              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="h5" fontWeight={500} ml={2} width="100%">
                    {estudiante.nombre}
                  </Typography>
                  <Typography variant="h5" fontWeight={500} ml={2} width="100%">
                    {estudiante.apellido}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  display="flex"
                  flexDirection="row"
                  gap={1}
                  alignItems="center"
                >
                  <RoundButton
                    color={{ backgroundColor: "#E6F3E5", color: "#4EAF51" }}
                    icon={"check-circle"}
                    onClick={() => handleStudentStatus(estudiante, "presentes")}
                  />
                  <RoundButton
                    color={{ backgroundColor: "#fdc4cc", color: "#f50007" }}
                    icon={"x-circle"}
                    onClick={() => handleStudentStatus(estudiante, "ausentes")}
                  />
                  <RoundButton
                    color={{ backgroundColor: "#EFFEFF", color: "#18c0ce" }}
                    icon={"clock"}
                    onClick={() => handleStudentStatus(estudiante, "atrasados")}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AsistenciaMainView;
