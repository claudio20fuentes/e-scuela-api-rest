import { useState, useEffect, useContext } from "react";
import { Grid, Button, Typography } from "@mui/material";

import DataOverView from "./DataOverview";
import WelcomeCard from "./WelcomeCard";
import FeatherIcon from "feather-icons-react";

import PageContainer from "@components/container/PageContainer";

import { getHorarioFromBloques } from "@services/profesoresServices";
import { getCursosFromBloques } from "@services/cursosServices";
import ClasesProfesor from "@views/docente/ClasesProfesor";

import { UserContext } from "@context/UserContext";

const Dashboard2 = () => {
  const [overviewInfo, setOverviewInfo] = useState([]);
  const {
    user: userData,
    userBloques,
    getBloques,
    setDateContext,
  } = useContext(UserContext);

  const horario = getHorarioFromBloques(userBloques);

  const overviewInfoDummy = [
    { subtitle: "Clases de hoy", total: 6, icon: "bar-chart-2" },
    { subtitle: "Clases Registradas", total: 4, icon: "check-circle" },
    { subtitle: "No Registradas", total: 2, icon: "user-x" },
  ];

  useEffect(() => {
    setOverviewInfo(overviewInfoDummy);
    setDateContext(new Date("2023-10-10T11:40:00"));
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
          <ClasesProfesor horario={horario} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};
export default Dashboard2;
