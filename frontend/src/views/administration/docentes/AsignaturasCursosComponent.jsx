import { useState, useEffect, useContext } from "react";
import {
  Grid,
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

import { getAllAsignaturas } from "@services/asignaturasServices";
import { getMatricula } from "@services/cursosServices";

const CreateDocente = ({ user, setUser }) => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState([]);
  const [newClassroom, setNewClassroom] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const asignaturas = await getAllAsignaturas();
      const cursos = await getMatricula();
      setSubjects(asignaturas);
      setClasses(cursos);
    };
    fetchData();
  }, []);

  const addSubject = () => {
    const alreadyExists = user.subjects.some((el) => el.value === newSubject.value );
    !alreadyExists &&
    newSubject.length != 0 &&
      setUser((prevUser) => ({
        ...prevUser,
        subjects: [...prevUser.subjects, newSubject],
      }));
    setNewSubject("");
  };

  const removeSubject = (value) => {
    setUser((prevUser) => ({
      ...prevUser,
      subjects: prevUser.subjects.filter((subject) => subject.value !== value),
    }));
  };

  const addClassroom = () => {
    const alreadyExists = user.classes.some((el) => el.value === newClassroom.value );
    !alreadyExists &&
    newClassroom.length != 0 &&
      setUser((prevUser) => ({
        ...prevUser,
        classes: [...prevUser.classes, newClassroom],
      }));
    setNewClassroom("");
  };

  const removeClassroom = (value) => {
    setUser((prevUser) => ({
      ...prevUser,
      classes: prevUser.classes.filter((el) => el.value !== value),
    }));
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container display="flex" spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomFormLabel htmlFor="role">Asignaturas</CustomFormLabel>
            <Grid item xs={12} mt={2} display="flex" gap={2}>
              <CustomSelect
                name="subject"
                variant="outlined"
                value={newSubject.value || ""}
                size="small"
                fullWidth
                onChange={(e) => {
                  const selected = subjects.find(
                    (type) => type.value === e.target.value
                  );
                  setNewSubject(selected);
                }}
              >
                {subjects?.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomSelect>
              <AddCircleOutlinedIcon
                color="primary"
                fontSize="large"
                onClick={addSubject}
              />
            </Grid>
            {user.subjects.length > 0 && (
              <List>
                {user.subjects.map((subject, index) => (
                  <ListItem key={index} style={{ padding: "0" }}>
                    <Grid
                      item
                      xs={10}
                      alignItems="center"
                      display="flex"
                      justifyContent="space-evenly"
                    >
                      <CircleIcon
                        style={{ color: "#1e4db7", marginRight: "10px" }}
                        fontSize="12px"
                      />
                      <ListItemText primary={subject.label} />
                      <IconButton
                        style={{ padding: "0" }}
                        onClick={() => {
                          removeSubject(subject.value);
                        }}
                      >
                        <FeatherIcon icon="x-square" style={{ color: "red" }} />
                      </IconButton>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomFormLabel htmlFor="classes">Cursos</CustomFormLabel>
            <Grid item xs={12} mt={2} display="flex" gap={2}>
              <CustomSelect
                name="classes"
                variant="outlined"
                value={newClassroom.value || ""}
                size="small"
                fullWidth
                onChange={(e) => {
                  const selected = classes.find(
                    (type) => type.value === e.target.value
                  );
                  setNewClassroom(selected);
                }}
              >
                {classes.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CustomSelect>
              <AddCircleOutlinedIcon
                color="primary"
                fontSize="large"
                onClick={addClassroom}
              />
            </Grid>
            {user.classes.length > 0 && (
              <List>
                {user.classes.map((classroom, index) => (
                  <ListItem key={index} style={{ padding: "0" }}>
                    <Grid
                      item
                      xs={10}
                      alignItems="center"
                      display="flex"
                      justifyContent="space-evenly"
                    >
                      <CircleIcon
                        style={{ color: "#1e4db7", marginRight: "10px" }}
                        fontSize="12px"
                      />
                      <ListItemText primary={classroom.label} />
                      <IconButton
                        style={{ padding: "0" }}
                        onClick={() => {
                          removeClassroom(classroom.value);
                        }}
                      >
                        <FeatherIcon icon="x-square" style={{ color: "red" }} />
                      </IconButton>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateDocente;
