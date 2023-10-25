import { useState, useEffect } from "react";
import { Grid, Button, useMediaQuery } from "@mui/material";

import { TableComponent } from "@components/tables/";

import DataOverView from "./DataOverview";
import WelcomeCard from "./WelcomeCard";
import FeatherIcon from "feather-icons-react";

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

  const Checked = () => <FeatherIcon icon="check" color="#4caf50" />;

  const NotChecked = () => <FeatherIcon icon="x" color="#f44336" />;

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
    {
      id: 4,
      curso: "4 Básico",
      estado: <NotChecked />,
      presentes: "",
      ausentes: "",
    },
    {
      id: 5,
      curso: "5 Básico",
      estado: <Checked />,
      presentes: "80%",
      ausentes: "20%",
    },
    {
      id: 6,
      curso: "6 Básico",
      estado: <NotChecked />,
      presentes: "",
      ausentes: "",
    },
    {
      id: 7,
      curso: "7 Básico",
      estado: <NotChecked />,
      presentes: "",
      ausentes: "",
    },
    {
      id: 8,
      curso: "8 Básico",
      estado: <Checked />,
      presentes: "80%",
      ausentes: "20%",
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
        <DataOverView data={overviewInfo} />
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
