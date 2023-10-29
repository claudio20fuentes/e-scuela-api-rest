import { useState, useEffect, useContext } from "react";
import { Grid } from "@mui/material";

import { TableComponent } from "@components/tables/";

import DataOverView from "./DataOverview";
import WelcomeCard from "./WelcomeCard";
import FeatherIcon from "feather-icons-react";

import { UserContext } from "../../context/UserContext";
import { getAllSchoolAsistenciaByDay } from "../../services/asistenciaServices";
import { getMatricula } from "../../services/cursosServices";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

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

  const formatOverViewData = () => {
    let totalRegistrados = 0;
    let total = 0;

    data.forEach((item) => {
      // Extract the "registrados" value from each object and convert it to a number
      const registrados = Number(item.registrados.split(" ")[0]);
      const totalRegistros = Number(item.registrados.split(" ")[2]);
      totalRegistrados += registrados;
      total += totalRegistros;
    });

    const noRegistrados = total - totalRegistrados;
    return [
      { subtitle: "Clases de hoy", total: total, icon: "bar-chart-2" },
      {
        subtitle: "Clases registradas",
        total: totalRegistrados,
        icon: "check-circle",
      },
      {
        subtitle: "Clases no registradas",
        total: noRegistrados,
        icon: "user-x",
      },
    ];
  };

  useEffect(() => {
    const fetch = async () => {
      const data = await getAllSchoolAsistenciaByDay(period);
      setData(data);
      setIsLoading(false);
      setDateContext(period);
    };
    fetch();
    setIsLoading(false);
  }, [period]);

  useEffect(() => {
    const overView = formatOverViewData(data);
    setOverviewInfo(overView);
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
          columnsOnMobile={2}
        />
      </Grid>
    </Grid>
  );
};
export default Dashboard1;
