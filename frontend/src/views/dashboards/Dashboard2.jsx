import { useState, useEffect, useContext } from "react";
import { Grid, Button, Typography } from "@mui/material";

import DataOverView from "./DataOverview";
import WelcomeCard from "./WelcomeCard";

import PageContainer from "@components/container/PageContainer";

import { getHorarioFromBloques } from "@services/profesoresServices";
import { getAsistenciaByDay } from "@services/asistenciaServices";

import ClasesProfesor from "@views/docente/ClasesProfesor";

import { UserContext } from "@context/UserContext";

const Dashboard2 = () => {
  const [overviewInfo, setOverviewInfo] = useState([]);
  const {
    user: userData,
    userBloques,
    setDateContext,
  } = useContext(UserContext);

  // const horario = getHorarioFromBloques(userBloques);

  const overviewInfoDummy = [
    { subtitle: "Clases de hoy", total: 6, icon: "bar-chart-2" },
    { subtitle: "Clases Registradas", total: 4, icon: "check-circle" },
    { subtitle: "No Registradas", total: 2, icon: "user-x" },
  ];

  const parse = (asistencia) => {

  }

  useEffect(() => {
    setOverviewInfo(overviewInfoDummy);
    const fetch = async () => {
      const asistenciaCompleta = await getAsistenciaByDay(new Date());
      console.log(asistenciaCompleta)
    }
    fetch();
    setDateContext(new Date("2023-10-11T08:46:00"));
  }, []);

  return (
    <PageContainer
      title="E-scuela Dashboard"
      description="this is Analytical Dashboard"
    >
      <Grid container spacing={3}>
        <Grid item sm={5} display={{ xs: "none", sm: "flex" }}>
          <WelcomeCard name={userData.name} />
        </Grid>
        <Grid item sm={7} display="flex">
          <DataOverView data={overviewInfo} />
        </Grid>
        <Grid item xs={12} display="flex">
          <ClasesProfesor bloques={userBloques} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};
export default Dashboard2;
