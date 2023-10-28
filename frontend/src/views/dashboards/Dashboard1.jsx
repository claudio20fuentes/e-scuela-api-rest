import { useState, useEffect, useContext } from "react";
import { Grid } from "@mui/material";

import { TableComponent } from "@components/tables/";

import DataOverView from "./DataOverview";
import WelcomeCard from "./WelcomeCard";
import FeatherIcon from "feather-icons-react";

import { UserContext } from "../../context/UserContext";
import { getAllSchoolAsistenciaByDay } from "../../services/asistenciaServices";

const { formatDate } = require('@utils/formatter')

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { setDate } from "date-fns";

const Dashboard1 = ({ userData }) => {
  const { date, setDateContext } = useContext(UserContext);
  
  const [overviewInfo, setOverviewInfo] = useState([]);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState(date.fullDate || new Date());
  const [presentes, setPresentes] = useState(0);
  const [ausentes, setAusentes] = useState(0);
  const [matricula, setMatricula] = useState([]);


  const formatOverViewData = (matricula = 0, presentes = 0, ausentes = 0) => {
    return [
      { subtitle: "Matricula", total: matricula, icon: "bar-chart-2" },
      { subtitle: "Presentes", total: presentes, icon: "check-circle" },
      { subtitle: "Ausentes", total: ausentes, icon: "user-x" },
    ];
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await getAllSchoolAsistenciaByDay(period);
      setData(data);
      setIsLoading(false);
      setDateContext(period)
    };
    fetch();
    setIsLoading(false);
  }, [period]);

  useEffect(() => {
    const fetch = async () => {
      setOverviewInfo(
        formatOverViewData(matricula.length, presentes, ausentes)
      );
    };
    fetch();
  }, [data]);

  return (
    <Grid container>
      <Grid item sm={5} display={{ xs: "none", sm: "flex" }}>
        <WelcomeCard name={userData.name} />
      </Grid>
      <Grid item sm={7} display="flex">
        <DataOverView data={overviewInfo} />
      </Grid>
      <Grid container>
        <Grid item xs={12} display="flex" justifyContent="flex-end" pr={2}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
            <DatePicker
              views={["year", "month", "day"]}
              openTo="month"
              value={new Date(date.fullDate)}
              onChange={setPeriod}
              disableFuture
              slotProps={{
                textField: {
                  placeholder: "Selecciona",
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <TableComponent
          rows={data}
          setSelected={setSelected}
          isLoading={isLoading}
          search={false}
          columnsOnMobile={3}
        />
      </Grid>
    </Grid>
  );
};
export default Dashboard1;
