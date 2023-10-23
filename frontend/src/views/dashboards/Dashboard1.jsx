import { useState, useEffect } from "react";
import { Grid, Button, useMediaQuery } from "@mui/material";

import { TableComponent } from "@components/tables/";

import DataOverView from "./DataOverview";
import DataOverViewXs from "./DataOverviewXs";
import WelcomeCard from "./WelcomeCard";
import FeatherIcon from "feather-icons-react"

const Dashboard1 = ({ userData }) => {
  const mobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [overviewInfo, setOverviewInfo] = useState([]);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const overviewInfoDummy = [
    { subtitle: "Matricula", total: 246, icon: "bar-chart-2" },
    { subtitle: "Presentes", total: 187, icon: "check-circle" },
    { subtitle: "Ausentes", total: 59, icon: "user-x" },
  ];

  const Checked = () => (
    <FeatherIcon icon="check" color="#4caf50" />
  );

  const NotChecked = () => (
    <FeatherIcon icon="x" color="#f44336" />
  );

  const dataDummy = [
    {
      id: 1,
      curso: "1 Básico",
      estado: <Checked />,
      presentes: "92%",
      ausentes: "8%",
    },
    {
      id: 2,
      curso: "2 Básico",
      estado: <Checked />,
      presentes: "80%",
      ausentes: "20%",
    },
    {
      id: 3,
      curso: "3 Básico",
      estado: <NotChecked />,
      presentes: "",
      ausentes: "",
    },
  ];

  useEffect(() => {
    setOverviewInfo(overviewInfoDummy);
    setData(dataDummy);
    setIsLoading(false);
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
      <Grid container>
        <TableComponent
          rows={data}
          setSelected={setSelected}
          optionIcon={"eye"}
          isLoading={isLoading}
          search={false}
          columnsOnMobile={3}
        />
      </Grid>
    </Grid>
  );
};
export default Dashboard1;
