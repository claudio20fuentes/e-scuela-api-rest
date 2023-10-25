import { useState, useEffect, useContext } from "react";
import { Grid, Button, Typography } from "@mui/material";

import WelcomeCard from "./WelcomeCard";
import PageContainer from "../../components/container/PageContainer";

import { getHorarioFromBloques } from "@services/profesoresServices";
import { getCursosFromBloques } from "@services/cursosServices";

import { UserContext } from "@context/UserContext";

const Dashboard2 = () => {
  const { user: userData, userBloques, getBloques } = useContext(UserContext);

  const horario = getHorarioFromBloques(userBloques);

  console.log(horario);
  return (
    <PageContainer
      title="E-scuela Dashboard"
      description="this is Analytical Dashboard"
    >
      <Grid container spacing={3}>
      <Grid item sm={5} display={{ xs: "none", sm: "flex" }}>
        <WelcomeCard name={userData.name} />
      </Grid>
        {horario.map((dia) => {
          return (
            <Grid key={dia.id} item display="flex" justifyContent="center">
              <Typography
                variant="h3"
                fontWeight={500}
                textAlign="center"
                mb={2}
              >
                {dia.value}
              </Typography>
              {dia.bloques.map((bloque) => {
                return (
                  <Grid
                    key={bloque.id}
                    item
                    display="flex"
                    justifyContent="center"
                  >
                    <Typography
                      variant="h3"
                      fontWeight={500}
                      textAlign="center"
                      mb={2}
                    >
                      {bloque.id}
                    </Typography>
                    {bloque.curso.value}
                  </Grid>
                );
              })}
            </Grid>
          );
        })}
      </Grid>
    </PageContainer>
  );
};
export default Dashboard2;
