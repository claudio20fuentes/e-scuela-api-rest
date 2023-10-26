import { useState, useEffect } from "react";
import {
  Card,
  Button,
  CardContent,
  Typography,
  Grid,
  Fab,
} from "@mui/material";
import RoundButton from "./RoundButtonComponent";
import FeatherIcon from "feather-icons-react";
import { capitalize } from "@utils/formatter";

import Spinner from "@views/spinner/Spinner";

const AsistenciaMainView = ({
  estudiantes = [],
  handleStudentStatus,
  asistencia,
  setAsistencia,
}) => {
  const [selected, setSelected] = useState({}); // {idMatricula, nombre, apellido}
  const [selectedButton, setSelectedButton] = useState("restantes");
  const [selectedStudents, setSelectedStudents] = useState(estudiantes);

  useEffect(() => {
    setSelectedButton("restantes");
    setSelectedStudents(estudiantes);
    setAsistencia((prev) => ({
      ...prev,
      restantes: estudiantes,
    }));
  }, [estudiantes]);

  useEffect(() => {
    setAsistencia((prevAsistencia) => ({
      ...prevAsistencia,
      [selectedButton]: prevAsistencia[selectedButton].filter(
        (student) => student.idMatricula !== selected.idMatricula
      ),
    }));
  }, [selectedButton, selected, setAsistencia]);
  
  useEffect(() => {
    setSelectedStudents(asistencia[selectedButton]);
  }
  , [asistencia, selectedButton]);

  const buttons = ["restantes", "presentes", "ausentes", "atrasados"];

  return (
    <Grid container>
      <Grid container style={{ borderBottom: "1px solid #8F90A6" }} mx={2}>
        {buttons.map((button, index) => {
          let total = asistencia[button]?.length || 0;
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
              onClick={() => setSelectedButton(button)}
            >
              {`${capitalize(button)} (${total})`}
            </Button>
          );
        })}
      </Grid>
      {selectedStudents.map((estudiante, index) => (
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
                    onClick={() => {
                      setSelected(estudiante);
                      handleStudentStatus(estudiante, "presentes");
                    }}
                  />
                  <RoundButton
                    color={{ backgroundColor: "#fdc4cc", color: "#f50007" }}
                    icon={"x-circle"}
                    onClick={() => {
                      setSelected(estudiante);
                      handleStudentStatus(estudiante, "ausentes");
                    }}
                  />
                  <RoundButton
                    color={{ backgroundColor: "#EFFEFF", color: "#18c0ce" }}
                    icon={"clock"}
                    onClick={() => {
                      setSelected(estudiante);
                      handleStudentStatus(estudiante, "atrasados");
                    }}
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
