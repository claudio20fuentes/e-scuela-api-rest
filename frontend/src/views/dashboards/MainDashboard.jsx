import { useEffect, useContext } from "react";

import { Alert } from "@mui/material";

import PageContainer from "@components/container/PageContainer";
import Dashboard1 from "./Dashboard1";
import Dashboard2 from "./Dashboard2";
import Dashboard3 from "./Dashboard3";

import { UserContext } from "@context/UserContext";

const MainDashboard = () => {
  const { user: userData, userBloques, success, setSuccess } = useContext(UserContext);

  useEffect(() => {
    setTimeout(() => {
      setSuccess({ estado: false, message: "" });
    }, 4000);
  }, [success]);

  return (
    <PageContainer
      title="E-scuela Dashboard"
    >

      {userData.role === 1 && <Dashboard1 userData={userData} />}
      {userData.role === 2 || userData.role === 3 && <Dashboard2 userData={userData} />}
      {userData.role === 4 && <Dashboard3 userData={userData} />}
      {success.estado && (
        <Alert
          variant="filled"
          severity="success"
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 9999,
            color: "white",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {success.message}
        </Alert>
      )}
    </PageContainer>
  );
};
export default MainDashboard;
