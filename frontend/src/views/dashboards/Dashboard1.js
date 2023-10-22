import { useState, useEffect } from "react";
import { Grid, Button, useMediaQuery } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

import { backend_url } from "../../config/variables";
import axios from "axios";
import PageContainer from "../../components/container/PageContainer";
import DataOverView from "./DataOverview";
import DataOverViewXs from "./DataOverviewXs";
import WelcomeCard from "./WelcomeCard";

const Dashboard1 = ({ userData }) => {
  const mobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [overviewInfo, setOverviewInfo] = useState([]);

  const overviewInfoDummy = [
    { subtitle: "Matricula", total: 10, icon: "bar-chart-2" },
    { subtitle: "Presentes", total: 20, icon: "check-circle" },
    { subtitle: "Ausentes", total: 10, icon: "user-x" },
  ];

  useEffect(() => {
    setOverviewInfo(overviewInfoDummy);
  }, []);

  return (
    <Grid container>
      <Grid item sm={5} display={{ xs: "none", sm: "flex" }}>
        <WelcomeCard name={userData.name} />
      </Grid>
      <Grid item sm={7} display="flex">
        {mobile ? (
          <DataOverViewXs data={overviewInfo} isLoading={false} />
        ) : (
          overviewInfo.map((item, index) => (
            <DataOverView
              key={index}
              total={item.total}
              subtitle={item.subtitle}
              icon={item.icon}
              isLoading={false}
            />
          ))
        )}
      </Grid>
    </Grid>
  );
};
export default Dashboard1;
