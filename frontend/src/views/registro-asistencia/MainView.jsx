import { useState, useEffect, useContext } from "react";
import { Typography, Grid, Link, Button } from "@mui/material";

import PageContainer from "@containers/PageContainer";
import { TableComponent } from "@components/tables/";

import { formatDate } from "@utils/formatter";
import { UserContext } from "@context/UserContext";

import { getAllProfesores } from "@services/profesoresServices";
import { getAllBloques } from "@services/bloquesServices";

const DocentesMainView = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [date, setDate] = useState(formatDate(new Date()));
  const [isLoading, setIsLoading] = useState(true);

  // USER CONTEXT

  const { user: userData, bloques } = useContext(UserContext);


  // REDIRECT TO PAGE WHEN BUTTON IS PRESSED
  useEffect(() => {
    if (selected.length > 0) {
      const id = selected[0];
      window.location.href = `#/administration/teachers/${id}`;
    }
  }, [selected]);

  // DATA PARSING TO FIT TABLE COMPONENT
  const parseData = (bloques) => {
    const rows = bloques.map((bloque) => {

      const { dia, curso, asignatura, profesore } = bloque;
      return {
        filas: dia.label,
        hora: bloque.horarioBloque,
      };
    });
    return rows;
  };

  console.log(data)

  return (
    <PageContainer title="Asistencia" description="reports detail page">
      <Grid container justifyContent="space-between" pl={3} mb={2}>
        <Grid item xs={12} mb={3}>
          <Typography variant="h2" fontWeight={500}>
            Registro de Asistencia
          </Typography>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end" pr={2}>
          <Link href={`#/administration/teachers/create`} underline="none">
            <Button variant="contained">+ Agregar</Button>
          </Link>
        </Grid>
      </Grid>
      <Grid container>
        <TableComponent
          rows={parseData(data)}
          setSelected={setSelected}
          optionIcon={"edit"}
          isLoading={isLoading}
          search={false}
          columnsOnMobile={3}
        />
      </Grid>
    </PageContainer>
  );
};

export default DocentesMainView;
