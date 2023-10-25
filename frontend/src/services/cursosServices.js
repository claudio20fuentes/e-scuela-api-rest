import axios from "axios";
import { backend_url as backendUrl } from "@variables";

import { getAllBloques } from "@services/bloquesServices";

export const getMatricula = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const cursos = await axios
      .get(`${backendUrl}/api/v1/matriculas/`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          token: localStorage.getItem("token"),
        },
      })
      
      const data = cursos.data.body;

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

export const getCursosByProfesor = async (idProfesor) => {
  // const todosCursos = await getAllCursos();
  const bloques = await getAllBloques({ idProfesor });
  const cursos = getCursosFromBloques(bloques);
  return cursos;
};

export const getCursosFromBloques = (bloques) => {
  const cursos = bloques.map((bloque) => bloque.curso);
  const cursosUnicos = [...new Set(cursos.map((curso) => curso.value))];
  const cursosParsed = cursosUnicos.map((curso) => ({
    value: curso,
    label: cursos.find((el) => el.value === curso).label,
  }));
  return cursosParsed;
};

