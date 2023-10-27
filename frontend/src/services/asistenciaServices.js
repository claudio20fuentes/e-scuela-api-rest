import axios from "axios";
import { backend_url as backendUrl } from "@variables";

import { getAllBloques } from "@services/bloquesServices";

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
  // compare with the date
  const currentDate = new Date(date).toISOString().split('T')[0];
  const todayData = parsedAsistencia.find(obj => obj.fecha === currentDate);
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
