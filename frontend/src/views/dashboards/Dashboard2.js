import { useState, useEffect, useContext } from "react";
import { Grid, Button } from "@mui/material";

import { backend_url } from "../../config/variables";
import axios from "axios";
import PageContainer from "../../components/container/PageContainer";

import { getHorarioFromBloques } from "@services/profesoresServices";
import { getCursosFromBloques } from "@services/cursosServices";

import { UserContext } from "@context/UserContext";

const Dashboard2 = () => {
  const { user: userData, userBloques, getBloques } = useContext(UserContext);

  const horario = getHorarioFromBloques(userBloques);

  console.log(horario)
  return (
    <PageContainer
      title="E-scuela Dashboard"
      description="this is Analytical Dashboard"
    >
      <Grid container spacing={3}>
        
      </Grid>
    </PageContainer>
  );
};
export default Dashboard2;
