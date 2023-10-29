import { useState, useEffect } from "react";
import {
  Card,
  Button,
  CardContent,
  Typography,
  Grid,
  Fab,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
} from "@mui/material";
import RoundButton from "./RoundButtonComponent";
import FeatherIcon from "feather-icons-react";
import { capitalize } from "@utils/formatter";

import Spinner from "@views/spinner/Spinner";

import CustomSelect from "@customElements/CustomSelect";
import { Controller, set, useForm } from "react-hook-form";

const AsistenciaMainView = ({
  handleStudentStatus,
  asistencia,
  setAsistencia,
}) => { // {idMatricula, nombre, apellido}
  const [selectedButton, setSelectedButton] = useState("presentes");
  const [isLoading, setIsLoading] = useState(true);

  const { control } = useForm({
    mode: "onTouched",
  });

  const buttons = ["presentes", "ausentes", "atrasados"];

  const bgColor = {
    presentes: "#E6F3E5",
    ausentes: "#fdc4cc",
    atrasados: "#EFFEFF",
  };

  const itemStyle = {
    width: "100%",
    backgroundColor: bgColor[selectedButton],
  };

  const getStatusColors = (status) => {
    switch (status) {
      case "presentes":
        return { backgroundColor: "#E6F3E5", color: "#4EAF51" };
      case "ausentes":
        return { backgroundColor: "#fdc4cc", color: "#f50007" };
      case "atrasados":
        return { backgroundColor: "#EFFEFF", color: "#18c0ce" };
      default:
        return { backgroundColor: "", color: "" }; // Default colors if status is unknown
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "presentes":
        return "check-circle";
      case "ausentes":
        return "x-circle";
      case "atrasados":
        return "clock";
      default:
        return ""; // Default icon if status is unknown
    }
  };

  const handleChangeStatus = (e, student) => {
    const status = e.target.value;
    const statusName = estados.find((estado) => estado.value === status).label.toLowerCase();
    handleStudentStatus(student, `${statusName}s`);
  };

  
  const estados = [
    { value: 1, label: "Presente" },
    { value: 2, label: "Ausente" },
    { value: 3, label: "Atrasado" },
  ];

  return (
    <>
      <Grid container>
        <Grid container style={{ borderBottom: "1px solid #8F90A6" }}>
          <Grid item xs={12} mx={2}>
            {buttons.map((button, index) => {
              let total = asistencia[button]?.length || 0;
              return (
                <Button
                  key={index}
                  sx={{
                    color: selectedButton === button ? "primary" : "#8F90A6",
                    fontWeight: selectedButton === button ? 700 : 400,
                    borderRadius: 0,
                    width: "30%",
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
          <Grid item display="flex" xs={12}>
            <Card style={{ width: "100%" }}>
              <CardContent style={{ padding: 0 }}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Apellido</TableCell>
                        <TableCell>Estado</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {asistencia[selectedButton]?.map((student, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell>{student.nombre}</TableCell>
                            <TableCell>{student.apellido}</TableCell>
                            <TableCell>
                              <Grid item>
                                <CustomSelect
                                  name="status"
                                  variant="outlined"
                                  value={student.estado}
                                  size="small"
                                  fullWidth
                                  onChange={(e) => {
                                    handleChangeStatus(e, student);
                                  }}
                                >
                                  {estados.map((option, index) => (
                                    <MenuItem key={index} value={option.value}>
                                      {option.label}
                                    </MenuItem>
                                  ))}
                                </CustomSelect>
                              </Grid>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AsistenciaMainView;
