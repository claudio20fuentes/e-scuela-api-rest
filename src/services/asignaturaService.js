const Asignatura = require("../models/asignaturaModel");

class AsignaturaService {
  async getAsignaturas(userData) {
    try {
      const asignaturas = await Asignatura.findAll({
        where: { idEscuela: userData.school },
      });
      return asignaturas;
    } catch (error) {
      console.error("Error al crear la asistencia", error);
    }
  }
}

module.exports = new AsignaturaService();
