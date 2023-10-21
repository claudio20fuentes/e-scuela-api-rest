import { useState, useEffect, useContext } from "react";
import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  MenuItem,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

import FeatherIcon from "feather-icons-react";

import CustomFormLabel from "@customElements/CustomFormLabel";
import CustomSelect from "@customElements/CustomSelect";

import { backend_url } from "@variables";
import axios from "axios";

const CreateDocente = ({ user, classTeacher, setClassTeacher }) => {
  const [newClassSubjects, setNewClassSubjects] = useState([]);

  useEffect(() => {
    const { subjects } = user;
    const { classes } = user;
    const classesBySubject = subjects.map((subject) => {
      return classes.filter((classroom) => classroom.subject === subject);
    });
    setClassTeacher();
  }, [user]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4" gutterBottom>
          Asignatura impartida por curso
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Curso</TableCell>
                <TableCell>Asignatura</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.classes.map((classroom, i) => (
                <TableRow key={i}>
                  <TableCell>{classroom.label}</TableCell>
                </TableRow>
              ))}
              {}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default CreateDocente;
