import axios from "axios";
import { backend_url as backendUrl } from "@variables";

export const getAllBloques = async (query = false) => {
  return new Promise(async (resolve, reject) => {
    let queryString = "";
    if (query) {
      queryString = `?${Object.keys(query)
        .map((key) => `${key}=${query[key]}`)
        .join("&")}`;
    }

    try {
      const res = await axios.get(
        `${backendUrl}/api/v1/bloques${queryString}`,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const data = res.data.body;
      const parsedData = parser(data);
      resolve(parsedData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      }
      if (error.response && error.response.status === 400) {
        resolve([]);
      }
      reject(error);
    }
  });
};

const formatter = (value) => {
  return {
    value: value.id,
    label: value.nombre || value.nombreCurso,
  };
};

const parser = (data) => {
  return data
    .map((el) => {
      const {
        Profesore: { User },
        Dia,
        Curso,
        Asignatura,
        BloquesHora,
        id,
        Asistencia,
      } = el;

      const { horaInicio, horaFin } = BloquesHora;

      const estadoNames = ["ausentes", "presentes", "atrasados", "retirados"];

      const asistencia =
        Asistencia.length === 0
          ? false
          : Asistencia.map((el) => {
              const detalles = el.DetallesAsistencias.reduce(
                (counts, detalleArray) => {
                  counts[estadoNames[detalleArray.estado]]++; // Use estadoNames to label the count
                  return counts;
                },
                { ausentes: 0, presentes: 0, atrasados: 0, retirados: 0 }
              ); // Initialize counts with named keys

              return { id: el.id, fecha: el.fecha, detalles };
            });

      return {
        profesor: {
          nombre: User.nombre,
          apellido: User.apellidos,
          id: el.id,
          idUser: User.id,
        },
        id,
        dia: formatter(Dia),
        curso: formatter(Curso),
        asignatura: formatter(Asignatura),
        asistencia,
        idHora: BloquesHora.id,
        horaInicio,
        horaFin,
      };
    })
    .sort((a, b) => {
      if (a.idHora < b.idHora) {
        return -1;
      }
      if (a.idHora > b.idHora) {
        return 1;
      }
      return 0;
    });
};

export const getBloqueById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const bloque = await axios.get(`${backendUrl}/api/v1/bloques/${id}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
          token: localStorage.getItem("token"),
        },
      });
      const data = bloque.data.body;
      const response = {
        profesor: {
          id: data.Profesore.id,
          nombre: data.Profesore.User.nombre,
          apellido: data.Profesore.User.apellidos,
        },
        curso: {
          id: data.Curso.id,
          nombre: data.Curso.nombreCurso,
          estudiantes: data.Curso.Matriculas.map((matricula) => ({
            idMatricula: matricula.id,
            nombre: matricula.Estudiante.nombre,
            apellido: matricula.Estudiante.apellido,
          })),
        },
        asignatura: {
          id: data.Asignatura.id,
          nombre: data.Asignatura.nombre,
        },
        asistencia:
          data.Asistencia == 0
            ? false
            : data.Asistencia.map((el) => {
                const detalles = el.DetallesAsistencias;
                return { id: el.id, fecha: el.fecha, detalles };
              }),
      };

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
