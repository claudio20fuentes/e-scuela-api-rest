import axios from "axios";
import { backend_url as backendUrl } from "@variables";

import { getAllBloques } from "@services/bloquesServices";

export const getAsistencia = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const asistencia = await axios
      .get(`${backendUrl}/api/v1/asistencia/`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          token: localStorage.getItem("token"),
        },
      })

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
}

