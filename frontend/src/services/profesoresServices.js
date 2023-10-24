import axios from "axios";
import { backend_url as backendUrl } from "@variables";

import { getCursosByProfesor } from "@services/cursosServices";

export const getAllProfesores = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${backendUrl}/api/v1/profesores/`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
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

export const getOneProfesor = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(`${backendUrl}/api/v1/profesores/${id}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const cursos = await getCursosByProfesor(id);
      const data = res.data.body;
      const parsed = {
        ...data,
        cursos,
      }
      resolve(parsed);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      }
      reject(error);
    }
  });
};

export const updateProfesor = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.put(`${backendUrl}/api/v1/profesores/${id}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
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

export const getHorarioFromBloques = (bloques) => {
  const result = [];

  bloques.forEach((item) => {
    const { dia, curso, asignatura, horarioBloque, profesor } = item;

    // Find the day in the result array or create a new day entry
    let dayEntry = result.find((entry) => entry.dia.value === dia.label);
    if (!dayEntry) {
      dayEntry = {
        dia: {
          id: dia.value,
          value: dia.label,
          bloque: [],
        },
      };
      result.push(dayEntry);
    }

    let bloqueEntry = dayEntry.dia.bloque.find(
      (entry) => entry.id === horarioBloque
    );
    if (!bloqueEntry) {
      bloqueEntry = {
        id: horarioBloque,
        asignatura: { id: asignatura.value, value: asignatura.label },
        curso: { id: curso.value, value: curso.label },
      };
      dayEntry.dia.bloque.push(bloqueEntry);
    }
  });

  return result;
};
