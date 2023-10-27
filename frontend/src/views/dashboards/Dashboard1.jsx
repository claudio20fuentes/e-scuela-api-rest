import { useState, useEffect } from "react";
import { Grid, Button, useMediaQuery } from "@mui/material";

import { TableComponent } from "@components/tables/";

import DataOverView from "./DataOverview";
import WelcomeCard from "./WelcomeCard";
import FeatherIcon from "feather-icons-react";

import { getMatricula, getAllCursos } from "@services/cursosServices";
import { getAsistenciaByDay } from "@services/asistenciaServices";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { es } from "date-fns/locale";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

const Dashboard1 = ({ userData }) => {
  const mobile = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [overviewInfo, setOverviewInfo] = useState([]);
  const [data, setData] = useState([]);
  const [asistenciaDia, setAsistenciaDia] = useState([]);
  const [selected, setSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState(new Date());
  const [presentes, setPresentes] = useState(0);
  const [ausentes, setAusentes] = useState(0);
  const [matricula, setMatricula] = useState([]);
  const [cursos, setCursos] = useState([]);

  const formatOverViewData = (matricula = 0, presentes = 0, ausentes = 0) => {
    return [
      { subtitle: "Matricula", total: matricula, icon: "bar-chart-2" },
      { subtitle: "Presentes", total: presentes, icon: "check-circle" },
      { subtitle: "Ausentes", total: ausentes, icon: "user-x" },
    ];
  };

  const Checked = () => <FeatherIcon icon="check" color="#4caf50" />;
  const NotChecked = () => <FeatherIcon icon="x" color="#f44336" />;

  const parse = (asistencia = [], period, cursos = [] ) => {
    let parsedResult = []
    let empty = []
    try{
      const idCursosConRegistro = asistencia || asistencia.length > 0 ? asistencia?.cursos?.map((curso) => curso?.idCurso) : [];
      const cursosSinRegistro = cursos.filter((curso) => !idCursosConRegistro?.includes(curso.idCurso));
      let presentes = 0;
      let ausentes = 0;
      // TODO: bring real bloquesHoras from backend
      const bloquesHoras = [1, 2, 3, 4, 5, 6];
  
      // Cursos sin registro
      const status2 = {};
      bloquesHoras.forEach((hora, index) => {
        status2[`bloque ${hora}`] = <NotChecked />
      });
  
      empty = cursosSinRegistro?.map((curso) => {
        return {
          id: curso.idCurso,
          curso: curso.nombre,
          registros: 0,
          ...status2,
        };
      })
      if(asistencia || asistencia.length > 0){
  
        parsedResult = asistencia.cursos?.map((curso) => {
          const { nombreCurso, bloques } = curso;
    
          const result = bloques.map((bloque) => {
            return {
              hora: bloque.idBloqueHora,
              total: bloque.detallesAsistencias.length,
              presentes: bloque.detallesAsistencias.filter((el) => el.estado === 1)
                .length,
              ausentes: bloque.detallesAsistencias.filter((el) => el.estado === 2)
                .length,
              atrasados: bloque.detallesAsistencias.filter((el) => el.estado === 3)
                .length,
            };
          });
    
          const maxPresentesObj = result.reduce((maxObj, currentObj) => {
            return currentObj.presentes > maxObj.presentes ? currentObj : maxObj;
          });
    
          presentes += maxPresentesObj.presentes;
          presentes += maxPresentesObj.atrasados;
          ausentes += maxPresentesObj.ausentes;
    
          const checked = result.map((el) => el.hora);
          const status = {};
    
          //Bring real cursos from backend
          bloquesHoras.forEach((hora, index) => {
            status[`bloque ${hora}`] = checked.includes(hora) ? (
              <Checked />
            ) : (
              <NotChecked />
            );
          });
    
          return {
            id: curso.idCurso,
            curso: nombreCurso,
            registros: `${checked.length} de ${bloquesHoras.length}`,
            ...status,
          };
        });
      }
      
    } catch(e){
      // Cursos sin registro
      const status2 = {};
      bloquesHoras.forEach((hora, index) => {
        status2[`bloque ${hora}`] = <NotChecked />
      });
  
      empty = cursosSinRegistro?.map((curso) => {
        return {
          id: curso.idCurso,
          curso: curso.nombre,
          registros: 0,
          ...status2,
        };
      })
    }

    setPresentes(presentes);
    setAusentes(ausentes);
    const result = [...parsedResult || [], ...empty]
    return result.sort((a, b) => a.curso.localeCompare(b.curso));
  };

  useEffect(() => {
    const fetch = async () => {
      const matricula = await getMatricula();
      setMatricula(matricula);
      const asistenciaDia = await getAsistenciaByDay(period);
      setAsistenciaDia(asistenciaDia);
      const cursos = await getAllCursos();
      setData(parse(asistenciaDia, period, cursos));
      setIsLoading(false);
    };
    fetch();
    setIsLoading(false);
  }, [period]);

  useEffect(() => {
    const fetch = async () => {
      setOverviewInfo(formatOverViewData(matricula.length, presentes, ausentes));
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
              value={period}
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
