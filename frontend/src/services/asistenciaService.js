import axios from "axios";
import { backend_url as backendUrl } from "@variables";

import { getAllBloques } from "@services/bloquesServices";

// ESTADOS
// 0: "restantes",
// 1: "presentes",
// 2: "ausentes",
// 3: "atrasados",

export const getAsistencia = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const asistencia = await axios.get(`${backendUrl}/api/v1/asistencia/`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          token: localStorage.getItem("token"),
        },
      });

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
      const asistenciaResponse = await axios.post(`${backendUrl}/api/v1/asistencia/`, payload, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          token: localStorage.getItem("token"),
        },
      });

      // // TODO: get id from aistencia response (?)
      // const idAsistencia = asistenciaResponse.data.body.idAsistencia;

      // asistencia.map(async (detalle) => {
      //   const detalleAsistencia = await axios.post(
      //     `${backendUrl}/api/v1/detalleAsistencia/`,
      //     {
      //       idAsistencia,
      //       idMatricula: detalle.idMatricula,
      //       estado: detalle.estado,
      //       fecha: new Date(),
      //     },
      //     {
      //       headers: {
      //         authorization: "Bearer " + localStorage.getItem("token"),
      //         token: localStorage.getItem("token"),
      //       },
      //     }
      //   );
      // });

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
