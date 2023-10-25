import { useState, useEffect, useContext } from "react";

import { Grid, Button } from "@mui/material";

import { backend_url } from "../../config/variables";
import axios from "axios";
import PageContainer from "@components/container/PageContainer";
import Dashboard1 from "./Dashboard1";
import Dashboard2 from "./Dashboard2";
import Dashboard3 from "./Dashboard3";

import { UserContext } from "@context/UserContext";

const MainDashboard = () => {
  const { user: userData, userBloques } = useContext(UserContext);

  useEffect(() => {}, []);

  return (
    <PageContainer
      title="E-scuela Dashboard"
    >

      {userData.role === 1 && <Dashboard1 userData={userData} />}
      {userData.role === 2 || userData.role === 3 && <Dashboard2 userData={userData} />}
      {userData.role === 4 && <Dashboard3 userData={userData} />}
    </PageContainer>
  );
};
export default MainDashboard;
