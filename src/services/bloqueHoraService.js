const BloqueHora = require("../models/bloqueHoraModel");
const sequelize = require("../config/db");

const { Op } = require("sequelize");

class BloquesServices {
  async getBloqueHora({ hora = false }) {
    try {
      const result = await BloqueHora.findAll({
        where: {
          horaInicio: {
            [Op.lt]: hora,
          }
        }
      });

      return result;
    } catch (error) {
      console.error("Error al traer los bloques de hora", error);
    }
  }
}

module.exports = new BloquesServices();
