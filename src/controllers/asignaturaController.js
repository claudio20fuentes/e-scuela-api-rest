const asignaturaService = require("../services/asignaturaService");

const getAllAsignaturas = async (req, res) => {
  try {
    const asignaturas = await asignaturaService.getAsignaturas(req.user);
    res.status(200).json({ succes: true, body: asignaturas });
  } catch (error) {
    console.error("Error al crear la asistencia:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
  getAllAsignaturas,
};
