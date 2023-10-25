const DetalleAsistenciaService = require("../services/detalleAsistenciaService");

const getDetalleAsistencia = async (req, res) => {
  const { school: idEscuela } = req.user;
  const query = { ...req.query, idEscuela };

  try {
    const result = await DetalleAsistenciaService.getDetalleAsistencia(
      query,
      idEscuela
    );
    return res.status(200).json({ succes: true, body: result });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

const createDetalleAsistencia = async (req, res) => {
  const detalle = req.body;

  try {
    const result = await DetalleAsistenciaService.createDetalleAsistencia(
      detalle
    );
    return res.status(200).json({ succes: true, data: result });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
  getDetalleAsistencia,
  createDetalleAsistencia,
};
