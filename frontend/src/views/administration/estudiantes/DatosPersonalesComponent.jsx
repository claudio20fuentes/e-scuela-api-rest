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
                    label="Rut"
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
              name="name"
              control={control}
              render={({ field }) => (
                <>
                  <CustomTextField
                    {...field}
                    ref={null}
                    label="Nombre Alumno"
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
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DatosPersonalesComponent;
