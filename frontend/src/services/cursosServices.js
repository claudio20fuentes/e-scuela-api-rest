import axios from "axios";
import { backend_url as backendUrl } from "@variables";

import { getAllBloques, getBloqueById } from "@services/bloquesServices";

export const getCursoByBloqueId = async (idBloque) => {
  const bloques = await getBloqueById(idBloque);

  return bloques;
  // return new Promise(async (resolve, reject) => {
  //   try {
  //     const curso = await axios
  //     .get(`${backendUrl}/api/v1/bloques/${idBloque}`, {
  //       headers: {
  //         authorization: "Bearer " + localStorage.getItem("token"),
  //         token: localStorage.getItem("token"),
  //       },
  //     })

  //     console.log("BLOQUES", bloques)
  //     const data = bloques[0].curso;
  //     resolve(data);
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       localStorage.clear();
  //       window.location.reload();
  //     }
  //     reject(error);
  //   }
  // });
};

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

export const getAllCursos = async () => {

  const matricula = await getMatricula();
  const cursos = matricula.reduce((acc, student) => {
    const courseId = student.curso.id;
    if (!acc[courseId]) {
      acc[courseId] = {
        idCurso: courseId,
        curso: student.curso.nombre,
        estudiantes: [],
      };
    }
    const studentInfo = {
      id: student.matricula.id,
      nombre: `${student.estudiantes.nombre} ${student.estudiantes.apellido}`,
    };
    acc[courseId].estudiantes.push(studentInfo);
    return acc;
  }, [])?.filter((item) => item !== null);
  return cursos;

}
