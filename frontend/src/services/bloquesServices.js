import axios from "axios";
import { backend_url as backendUrl } from "@variables";

export const getAllBloques = async (
  query = false,
  date = { day: false, time: false }
) => {
  return new Promise(async (resolve, reject) => {
    let queryString = "";
    let dateString = "";
    if (query) {
      queryString = `?${Object.keys(query)
        .map((key) => `${key}=${query[key]}`)
        .join("&")}`;
    }
    if (date.day) {
      const { day, time } = date;
      dateString = `&hora=${time}&idDia=${day}`;
    }
    try {
      const res = await axios.get(
        `${backendUrl}/api/v1/bloques${queryString}${dateString}`,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const data = res.data.body;
      console.log("ANTES", data);
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

      const asistencia = Asistencia.length === 0 ? false : Asistencia.map((el) => {
        const detalles = el.DetallesAsistencias.reduce((counts, detalleArray) => {
          counts[estadoNames[detalleArray.estado]]++; // Use estadoNames to label the count
          return counts;
        }, { ausentes: 0, presentes: 0, atrasados: 0, retirados: 0 }); // Initialize counts with named keys
      
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
