import axios from "axios";
import { backend_url as backendUrl } from "@variables";

export const fetchSubjects = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${backendUrl}/api/v1/asignaturas/`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const data = res.data.body;
      const parsedSubjects = data.map((subject) => ({
        value: subject.id,
        label: subject.nombre,
      }));

      resolve(parsedSubjects);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      }
      reject(error);
    }
  });
};

export const fetchClasses = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${backendUrl}/api/v1/cursos/`, {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
  
        const data = res.data.body;
        const parsedClasses = data.map((subject) => ({
          value: subject.id,
          label: subject.nombreCurso,
        }));
  
        resolve(parsedClasses);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.clear();
          window.location.reload();
        }
        reject(error);
      }
    });
  };
