// const AsistenciaService = require("../services/detalleAsistenciaService");
const AsistenciaService = require("../services/asistenciaService");

const getAsistencia = async (req, res) => {
  const { school: idEscuela } = req.user;
  const query = { ...req.query, idEscuela };

  try {
    const result = await AsistenciaService.getAsistencia(
      query,
      idEscuela
    );
    return res.status(200).json({ succes: true, body: result });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const createAsistencia = async (req, res) => {
  const detalle = req.body;

  try {
    const result = await AsistenciaService.createAsistencia(
      detalle
    );
    return res.status(200).json({ succes: true, data: result });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
  getAsistencia,
  createAsistencia,
};
