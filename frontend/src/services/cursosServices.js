import axios from "axios";
import { backend_url as backendUrl } from "@variables";

import { getAllProfesores } from "@services/profesoresServices";
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

export const getMatricula = async (id = "") => {
  return new Promise(async (resolve, reject) => {
    try {
      const cursos = await axios.get(`${backendUrl}/api/v1/matriculas/${id}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          token: localStorage.getItem("token"),
        },
      });

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
  const AllCursos = await getAllCursos();
  const bloques = await getAllBloques({ idProfesor });
  const cursos = getCursosFromBloques(bloques);
  const cursosParsed = cursos.map((curso) => {
    const { value, label } = curso;
    const cursoInfo = AllCursos.find((el) => el.idCurso === value);
    return {
      id: value,
      nombre: label,
      totalMatriculas: cursoInfo.estudiantes.length,
      estudiantes: cursoInfo.estudiantes,
      profesor: cursoInfo.profesor,
    };
  });
  return cursosParsed;
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
  const profesores = await getAllProfesores();
  const matricula = await getMatricula();
  let headTeacher = {};
  const cursos = matricula
    .reduce((acc, student) => {
      const courseId = student.curso.id;
      // get Headteacher
      headTeacher = profesores.find((teacher) => {
        const headTeacherArray = teacher.headTeacher;
        if (headTeacherArray) {
          return headTeacherArray.find((el) => el.id === courseId);
        }
        return null; // Return null if no matching head teacher is found
      });

      const parsedHeadTeacher = {
        idProfesor: headTeacher.id,
        nombre: headTeacher.userData.nombre,
        apellidos: headTeacher.userData.apellidos,
        correo: headTeacher.userData.correo,
      };

      if (!acc[courseId]) {
        acc[courseId] = {
          idCurso: courseId,
          nombre: student.curso.nombre,
          estudiantes: [],
          profesor: parsedHeadTeacher,
        };
      }
      const studentInfo = {
        id: student.matricula.id,
        nombre: `${student.estudiantes.nombre} ${student.estudiantes.apellido}`,
      };
      acc[courseId].estudiantes.push(studentInfo);
      return acc;
    }, [])
    ?.filter((item) => item !== null);
  return cursos;
};

export const createMatricula = async (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      
      const cursos = await axios.post(`${backendUrl}/api/v1/matriculas/${id}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          token: localStorage.getItem("token"),
        },
      });

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
