import axios from "axios";
import { backend_url as backendUrl } from "@variables";
import { IconButton } from "@mui/material";

import FeatherIcon from "feather-icons-react";

import { getAllBloques } from "@services/bloquesServices";
import { getMatricula, getAllCursos } from "@services/cursosServices";

const { formatDate } = require("@utils/formatter");

// ESTADOS
// 0: "restantes",
// 1: "presentes",
// 2: "ausentes",
// 3: "atrasados",

export const getAsistencia = async (query = false) => {
  return new Promise(async (resolve, reject) => {
    try {
      let queryString = "";
      if (query) {
        queryString = `?${Object.keys(query)
          .map((key) => `${key}=${query[key]}`)
          .join("&")}`;
      }
      const asistencia = await axios.get(
        `${backendUrl}/api/v1/asistencia_unica/${queryString}`,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
            token: localStorage.getItem("token"),
          },
        }
      );

      const data = asistencia.data.body;
      resolve(data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      }
      reject(error);
    }
  });
};

// ESTADOS
// 0: "restantes",
// 1: "presentes",
// 2: "ausentes",
// 3: "atrasados",

export const createAsistencia = async (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const asistenciaResponse = await axios.post(
        `${backendUrl}/api/v1/asistencia/`,
        payload,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
            token: localStorage.getItem("token"),
          },
        }
      );

      const data = asistenciaResponse.data.body;
      resolve(data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      }
      reject(error);
    }
  });
};

export const checkAsistencia = async (date) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/v1/asistencias/check?idCurso=${idCurso}&idBloque=${idBloque}&idEstudiante=${idEstudiante}`,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
            token: localStorage.getItem("token"),
          },
        }
      );
      const data = res.data.body;
      resolve(data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      }
      reject(error);
    }
  });
};

export const getAsistenciaByDay = async (date = new Date()) => {
  const asistencia = await getAsistencia();
  const parsedAsistencia = transformData(asistencia);
  const currentDateParts = new Date(date)
    .toLocaleString("es-ES", { timeZone: "America/Santiago" })
    .split(",")[0]
    .split("/");
  const currentDate = `${currentDateParts[2]}-${currentDateParts[1]}-${currentDateParts[0]}`;
  const todayData = parsedAsistencia.filter((obj) => obj.fecha === currentDate);
  return todayData;
};

function transformData(asistencia) {
  const transformedData = [];

  asistencia.forEach((item) => {
    const id = item.id;
    const fecha = item.fecha.split("T")[0]; // Extract date without time
    const cursoId = item.Bloque.Curso.id;
    const nombreCurso = item.Bloque.Curso.nombreCurso;
    const idBloqueHora = item.Bloque.idBloqueHora;

    // Check if a corresponding date already exists
    const existingEntry = transformedData.find(
      (entry) => entry.fecha === fecha
    );

    if (existingEntry) {
      const existingCurso = existingEntry.cursos.find(
        (curso) => curso.idCurso === cursoId
      );

      if (existingCurso) {
        existingCurso.bloques.push({
          idBloque: item.idBloque,
          idBloqueHora, // Include idBloqueHora
          detallesAsistencias: item.DetallesAsistencias,
        });
      } else {
        existingEntry.cursos.push({
          idCurso: cursoId,
          nombreCurso, // Include nombreCurso
          bloques: [
            {
              idBloque: item.idBloque,
              idBloqueHora, // Include idBloqueHora
              detallesAsistencias: item.DetallesAsistencias,
            },
          ],
        });
      }
    } else {
      transformedData.push({
        fecha,
        id,
        cursos: [
          {
            idCurso: cursoId,
            nombreCurso, // Include nombreCurso
            bloques: [
              {
                idBloque: item.idBloque,
                idBloqueHora, // Include idBloqueHora
                detallesAsistencias: item.DetallesAsistencias,
              },
            ],
          },
        ],
      });
    }
  });
  return transformedData;
}

function createUniqueCursosArray(registries) {
  const uniqueCursos = {};

  registries.forEach((registry) => {
    const {
      idCurso,
      nombreCurso,
      idBloque,
      idBloqueHora,
      asistencia,
      horaInicio,
      horaFin,
    } = registry;

    if (!uniqueCursos[idCurso]) {
      uniqueCursos[idCurso] = {
        idCurso,
        nombreCurso,
        bloques: [],
      };
    }

    uniqueCursos[idCurso].bloques.push({
      idBloque,
      idBloqueHora,
      asistencia,
      horaInicio,
      horaFin,
    });
  });

  return Object.values(uniqueCursos);
}

const parser = (bloques) => {
  const result = bloques.map((bloque) => {
    const {
      horaInicio,
      horaFin,
      id: idBloque,
      idHora: idBloqueHora,
      asistencia,
      curso,
    } = bloque;

    return {
      horaInicio,
      horaFin,
      idBloque,
      idBloqueHora,
      asistencia: !!asistencia.length,
      idCurso: curso.value,
      nombreCurso: curso.label,
    };
  });
  const parsedResultByCurso = createUniqueCursosArray(result);
  return parsedResultByCurso;
};

export const getAllSchoolAsistenciaByDay = async (period) => {
  const { day, date } = formatDate(period);
  const bloques = await getAllBloques({ day, date });
  const parsedBloques = parser(bloques);

  const response = parsedBloques.map((bloque) => {
    const { bloques, nombreCurso } = bloque;
    const registrados = `${
      bloques.filter((bloque) => bloque.asistencia).length
    } de ${bloques.length}`;
    const status = {};
    bloques.forEach((bloque) => {
      const { asistencia, idBloque, idBloqueHora } = bloque;
      status[`bloque ${idBloqueHora}`] = asistencia ? (
        <Checked idBloque={idBloque} />
      ) : (
        <NotChecked idBloque={idBloque} />
      );
    });

    return {
      curso: nombreCurso,
      registrados,
      ...status,
    };
  });
  return response;
};

const Checked = ({ idBloque }) => (
  <IconButton
    onClick={() => handleClickChecked(idBloque)}
  >
    <FeatherIcon icon="check" color="#4caf50" />
  </IconButton>
);
const NotChecked = ({ idBloque }) => (
  <IconButton
    onClick={() => handleClickUnchecked(idBloque)}
  >
    <FeatherIcon icon="x" color="#f44336" />
  </IconButton>
);

const handleClickChecked = async (idBloque) => {
  window.location.href = `#/attendance/${idBloque}/edit`;
};

const handleClickUnchecked = async (idBloque) => {
  window.location.href = `#/attendance/${idBloque}`;
};