import axios from "axios";
import { backend_url as backendUrl } from "@variables";

export const getAllBloques = async (query = false, date = {day: false, time: false } ) => {
  return new Promise(async (resolve, reject) => {
    let queryString = "";
    let dateString = "";
    if (query) {
      queryString = `${Object.keys(query)
        .map((key) => `${key}=${query[key]}`)
        .join("&")}`;
    }
    if (date.day) {
      const { day, time } = date;
      dateString = `hora=${time}&idDia=${day}`;
    }
    try {
      const res = await axios.get(
        `${backendUrl}/api/v1/bloques?${queryString}&${dateString}`,
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      const data = res.data.body;

      const formatter = (value) => {
        return {
          value: value.id,
          label: value.nombre || value.nombreCurso,
        };
      };

      const parser = (data) => {
        return data.map((el) => {
          const {
            Profesore: { User },
            Dia,
            Curso,
            Asignatura,
            BloquesHora,
          } = el;

          return {
            profesor: {
              nombre: User.nombre,
              apellido: User.apellidos,
              id: el.id,
              idUser: User.id,
            },
            dia: formatter(Dia),
            curso: formatter(Curso),
            asignatura: formatter(Asignatura),
            horarioBloque: BloquesHora.id,
          };
        });
      };

      resolve(parser(data));
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

