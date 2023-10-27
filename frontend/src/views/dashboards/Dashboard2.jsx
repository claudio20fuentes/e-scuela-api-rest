import { useState, useEffect, useContext } from "react";
import { Grid, Button, Typography } from "@mui/material";

import DataOverView from "./DataOverview";
import WelcomeCard from "./WelcomeCard";

import PageContainer from "@components/container/PageContainer";
import Spinner from "@views/spinner/Spinner";

import { getHorarioFromBloques } from "@services/profesoresServices";
import { getAsistenciaByDay } from "@services/asistenciaServices";

import ClasesProfesor from "@views/docente/ClasesProfesor";

import { UserContext } from "@context/UserContext";

const Dashboard2 = () => {
  const [overviewInfo, setOverviewInfo] = useState([]);
  const [todayClasses, setTodayClasses] = useState([]);
  const [totalDiarios, setTotalDiarios] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const {
    user: userData,
    userBloques,
    setDateContext,
  } = useContext(UserContext);

  const parseOveviewInfo = (totalclases = [], totalDiarios = []) => {
    const registradas = todayClasses?.length;
    const total = totalDiarios?.todayClasses?.length;
    const noRegistradas = total - registradas;

    if (!total){ return []};

    const result = [
      { subtitle: "Clases de hoy", total: total, icon: "bar-chart-2" },
      {
        subtitle: "Clases Registradas",
        total: registradas,
        icon: "check-circle",
      },
      { subtitle: "No Registradas", total: noRegistradas, icon: "user-x" },
    ];

    return result;
  };

  useEffect(() => {
    setIsLoading(true);
    setDateContext(new Date("2023-10-11T08:46:00"));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const overViewPased = parseOveviewInfo(todayClasses, totalDiarios);
    setOverviewInfo(overViewPased);
    setIsLoading(false);
  }, [todayClasses, totalDiarios]);

  return isLoading ? (
    <Spinner />
  ) : (
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
          <ClasesProfesor
            bloques={userBloques}
            todayClasses={todayClasses}
            setTodayClasses={setTodayClasses}
            setTotalDiarios={setTotalDiarios}
          />
        </Grid>
      </Grid>
    </PageContainer>
  );
};
export default Dashboard2;
