import axios from "axios";
import { backend_url as backendUrl } from "@variables";
import { IconButton } from "@mui/material";

import FeatherIcon from "feather-icons-react";

import { getAllBloques, getBloquesHora } from "@services/bloquesServices";
import { getCursoByBloqueId } from "@services/cursosServices";

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
  const todayData = parsedAsistencia.filter((obj) => obj.fecha === date);
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
  <IconButton onClick={() => handleClickChecked(idBloque)}>
    <FeatherIcon icon="check" color="#4caf50" />
  </IconButton>
);
const NotChecked = ({ idBloque }) => (
  <IconButton onClick={() => handleClickUnchecked(idBloque)}>
    <FeatherIcon icon="x" color="#f44336" />
  </IconButton>
);

const handleClickChecked = async (idBloque) => {
  window.location.href = `#/attendance/${idBloque}/edit`;
};

const handleClickUnchecked = async (idBloque) => {
  window.location.href = `#/attendance/${idBloque}`;
};

export const getAsistenciaByCursoClass = async (idBloque, date) => {
  const bloqueCompleto = await getCursoByBloqueId(idBloque);
  const asistencia = parse(bloqueCompleto, date);
  return asistencia;
};

function mixArrays(students, details) {
  // Create an object to store students by idMatricula
  const studentsById = {};
  students.forEach((student) => {
    studentsById[student.idMatricula] = student;
  });

  // Combine the two arrays based on idMatricula
  const combinedArray = details.map((detail) => ({
    ...studentsById[detail.idMatricula],
    estado: detail.estado,
    idDetalle: detail.id,
  }));

  return combinedArray;
}

const parse = (bloqueCompleto, date) => {
  const {
    curso: { estudiantes },
    asistencia,
  } = bloqueCompleto;

  const asistenciaHoy = asistencia?.find((asistencia) => {
    if (asistencia.fecha.split("T")[0] === date.date) {
      return { id: asistencia.id, detalle: asistencia.detalle };
    }
    return [];
  });

  if (!asistenciaHoy.detalles.length) {
    return estudiantes.map((student) => ({
      ...student,
      estado: 0,
    }));
  }

  const result = mixArrays(estudiantes, asistenciaHoy.detalles);

  const presentes = result.filter((student) => student.estado === 1);
  const ausentes = result.filter((student) => student.estado === 2);
  const atrasados = result.filter((student) => student.estado === 3);

  return {
    idAsistencia: asistenciaHoy.id,
    detalles: { todos: result, presentes, ausentes, atrasados },
  };
};

export const updateDetalleAsistencia = async ({ id, asistencia }) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = true;

      asistencia.map(async (estudiante) => {
        const payload = {
          estado: estudiante.estado,
        };
        try {
          await axios.put(
            `${backendUrl}/api/v1/asistencia/detalle/${estudiante.idDetalle}`,
            payload,
            {
              headers: {
                authorization: "Bearer " + localStorage.getItem("token"),
                token: localStorage.getItem("token"),
              },
            }
          );
        } catch (error) {
          response = false;
          console.log("error: ", error);
        }
      });

      resolve(response);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      }
      reject(error);
    }
  });
};

export const getProfesorAsistenciaByDay = async (period) => {
  const { day, date } = formatDate(period);
  const bloques = await getAllBloques({ day, date });
  const parsedBloques = parser(bloques);

  const result = parsedBloques.map((curso) => {
    const { bloques, nombreCurso } = curso;
    const bloque = bloques[0];

    const estado = bloque.asistencia

    return {
      id: bloque.idBloque,
      bloque: bloque.idBloqueHora,
      curso: nombreCurso,
      estado,
    };
  });

  return result.sort((a, b) => a.bloque - b.bloque);
};
