import { useState, useEffect } from "react";
import { Grid, Typography, MenuItem } from "@mui/material";

import { Controller, useForm } from "react-hook-form";

import CustomTextField from "@customElements/CustomTextField";
import CustomFormLabel from "@customElements/CustomFormLabel";
import CustomSelect from "@customElements/CustomSelect";

import { getAllRoles } from "@services/rolesServices";
import { getAllCursos } from "@services/cursosServices";

const DatosPersonalesComponent = ({ user, setUser }) => {
  const [roles, setRoles] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);

  const { control } = useForm({
    mode: "onTouched",
  });

  useEffect(() => {
    const fetchData = async () => {
      const rols = await getAllRoles();
      const cursos = await getAllCursos();
      setClasses(cursos);
      setRoles(rols);
    };
    fetchData();
    setIsLoadingRoles(false);
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
                      setUser({ ...user, apellidos: e.target.value })
                    }
                  />
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="mail"
              control={control}
              render={({ field }) => (
                <>
                  <CustomTextField
                    {...field}
                    ref={null}
                    label="Email"
                    value={user.correo}
                    id="mail"
                    variant="outlined"
                    fullWidth
                    onChange={(e) =>
                      setUser({ ...user, correo: e.target.value })
                    }
                  />
                </>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <>
                  <CustomTextField
                    {...field}
                    ref={null}
                    label="Teléfono"
                    value={user.movil}
                    id="phone"
                    variant="outlined"
                    fullWidth
                    onChange={(e) =>
                      setUser({ ...user, movil: e.target.value })
                    }
                  />
                </>
              )}
            />
          </Grid>
          {!isLoadingRoles && (
            <>
              <Grid item xs={12}>
                <CustomFormLabel htmlFor="role" style={{ marginBottom: 10 }}>
                  Tipo de cuenta
                </CustomFormLabel>
                <CustomSelect
                  name="role"
                  variant="outlined"
                  value={user.idRol}
                  size="small"
                  fullWidth
                  onChange={(e) => {
                    const selectedType = roles.find(
                      (type) => type.value === e.target.value
                    );
                    setUser((prevUser) => ({
                      ...prevUser,
                      idRol: selectedType.value,
                    }));
                  }}
                >
                  {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </Grid>
              {user.idRol === 2 && (
                <Grid item xs={12}>
                  <CustomFormLabel
                    htmlFor="headTeacher"
                    style={{ marginBottom: 10 }}
                  >
                    Curso de Jefatura
                  </CustomFormLabel>
                  <CustomSelect
                    name="classes"
                    variant="outlined"
                    value={user.headTeacher.classroom.value || ""}
                    size="small"
                    fullWidth
                    onChange={(e) => {
                      const selected = classes.find(
                        (type) => type.value === e.target.value
                      );
                      setUser((prevUser) => ({
                        ...prevUser,
                        headTeacher: {
                          state: true,
                          classroom: selected,
                        },
                      }));
                    }}
                  >
                    {classes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomSelect>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DatosPersonalesComponent;
