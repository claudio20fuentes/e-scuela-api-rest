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
          } = el;

          return {
            profesor: User,
            dia: formatter(Dia),
            curso: formatter(Curso),
            asignatura: formatter(Asignatura),
          };
        });
      };

      resolve(parser(data));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        window.location.reload();
      }
      reject(error);
    }
  });
};
