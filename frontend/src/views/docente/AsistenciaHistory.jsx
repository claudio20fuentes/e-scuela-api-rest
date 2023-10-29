import { useState, useEffect, useContext } from "react";
import { Grid, IconButton } from "@mui/material";

import FeatherIcon from "feather-icons-react";

import { TableComponent } from "@components/tables/";

import DataOverView from "./DataOverview";
import WelcomeCard from "./WelcomeCard";

import { UserContext } from "@context/UserContext";
import { getProfesorAsistenciaByDay } from "@services/asistenciaServices";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

const Dashboard1 = () => {
  const { date, setDateContext } = useContext(UserContext);

  const [overviewInfo, setOverviewInfo] = useState([]);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState(date.fullDate || new Date());
  const [rawData, setRawData] = useState([]);

  const handleClickChecked = async (idBloque) => {
    window.location.href = `#/attendance/${idBloque}/edit`;
  };

  const handleClickUnchecked = async (idBloque) => {
    window.location.href = `#/attendance/${idBloque}`;
  };

  const formatData = (info) => {
    const Checked = ({ idBloque }) => (
      <IconButton onClick={() => handleClickChecked(idBloque)}>
        <FeatherIcon icon="check" color="#4caf50" />
      </IconButton>
    );
    const NotChecked = ({ idBloque }) => (
      <IconButton onClick={() => handleClickUnchecked(idBloque)}>
        <FeatherIcon icon="x" color="#f44336" />
      </IconButton>
    );

    const result = info.map((item) => {
      const { id, estado } = item;
      return {
        ...item,
        estado: estado ? (
          <Checked idBloque={id} />
        ) : (
          <NotChecked idBloque={id} />
        ),
      };
    });
    return result;
  };

  const formatOverViewData = (data) => {
    let totalRegistrados = 0;
    let total = 0;

    data.forEach((item) => {
      total++;
      if (item.estado) {
        totalRegistrados++;
      }
    });

    const noRegistrados = total - totalRegistrados;
    return [
      { subtitle: "Clases del día", total: total, icon: "bar-chart-2" },
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
      const data = await getProfesorAsistenciaByDay(period);
      const dataFormatted = formatData(data);
      setData(dataFormatted);
      setRawData(data);
      setIsLoading(false);
      setDateContext(period);
    };
    fetch();
    setIsLoading(false);
  }, [period]);

  useEffect(() => {
    const overView = formatOverViewData(rawData);
    setOverviewInfo(overView);
  }, [data]);

  return (
    <Grid container>
      <Grid item sm={5} display={{ xs: "none", sm: "flex" }}>
        <WelcomeCard />
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
          columnsOnMobile={4}
        />
      </Grid>
    </Grid>
  );
};
export default Dashboard1;
