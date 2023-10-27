import { useState, useEffect } from "react";
import { Grid, Typography, MenuItem } from "@mui/material";

import { Controller, useForm } from "react-hook-form";

import CustomTextField from "@customElements/CustomTextField";
import CustomFormLabel from "@customElements/CustomFormLabel";
import CustomSelect from "@customElements/CustomSelect";

import { getAllRoles } from "@services/rolesServices";
import { getAllCursos } from "@services/cursosServices";

const DatosPersonalesComponent = ({ user, setUser }) => {
  const [classes, setClasses] = useState([]);

  const { control } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    const fetchData = async () => {
      const cursos = await getAllCursos();
      const formattedCursos = cursos.map((curso) => {
        return { value: curso.idCurso, label: curso.nombre };
      });
      setClasses(formattedCursos);
    };
    fetchData();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container display="flex" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Datos Personales</Typography>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <>
                  <CustomTextField
                    {...field}
                    ref={null}
                    label="Nombre"
                    value={user.nombre}
                    id="name"
                    variant="outlined"
                    fullWidth
                    onChange={(e) =>
                      setUser({ ...user, nombre: e.target.value })
                    }
                  />
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="lname"
              control={control}
              render={({ field }) => (
                <>
                  <CustomTextField
                    {...field}
                    ref={null}
                    label="Apellidos"
                    value={user.apellidos}
                    id="lname"
                    variant="outlined"
                    fullWidth
                    onChange={(e) =>
                      setUser({ ...user, apellido: e.target.value })
                    }
                  />
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="rut"
              control={control}
              render={({ field }) => (
                <>
                  <CustomTextField
                    {...field}
                    ref={null}
                    label="Rut"
                    value={user.rut}
                    id="rut"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setUser({ ...user, rut: e.target.value })}
                  />
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <CustomFormLabel htmlFor="headTeacher" style={{ marginBottom: 10 }}>
              Curso
            </CustomFormLabel>
            <CustomSelect
              name="classes"
              variant="outlined"
              value={user.curso.value}
              fullWidth
              onChange={(e) => {
                const selected = classes.find(
                  (type) => type.value === e.target.value
                );
                setUser((prevUser) => ({
                  ...prevUser,
                  curso: selected,
                }));
              }}
            >
              {classes.map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </CustomSelect>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DatosPersonalesComponent;
