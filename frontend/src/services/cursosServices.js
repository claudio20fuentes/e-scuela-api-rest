import axios from "axios";
import { backend_url as backendUrl } from "@variables";

import { getAllBloques } from "@services/bloquesServices";

export const getAllCursos = async () => {
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

export const getCursosByProfesor = async (idProfesor) => {

  const bloques = await getAllBloques({ idProfesor });
  const cursos = bloques.map((bloque) => bloque.curso);
  const cursosUnicos = [...new Set(cursos.map((curso) => curso.value))];
  const cursosParsed = cursosUnicos.map((curso) => ({
    value: curso,
    label: cursos.find((el) => el.value === curso).label,
  }));
  return cursosParsed;
}