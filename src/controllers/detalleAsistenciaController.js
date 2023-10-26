const DetalleAsistenciaService = require("../services/detalleAsistenciaService");
const AsistenciaService = require("../services/asistenciaService");

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
  const { idBloque: idBloqueString, asistencia } = req.body;
  const { school: idEscuela } = req.user;
  const idBloque = parseInt(idBloqueString);
  const payloadAsistencia = { fecha: new Date(), idBloque, idEscuela };

  try {
    const asistenciaResult = await AsistenciaService.createAsistencia(
      payloadAsistencia
    );
    if (asistenciaResult) {
      const payloadDetalle = {
        idAsistencia: asistenciaResult.id,
        idEscuela,
        fecha: new Date(),
      };
      asistencia.map(async (detalle) => {
        try {
          await DetalleAsistenciaService.createDetalleAsistencia({
            ...payloadDetalle,
            idMatricula: detalle.idMatricula,
            estado: detalle.estado,
          });
        } catch (error) {
          console.log(error, "en la matricula: ", detalle.idMatricula)
        }
      });
    }
    return res.status(200).json({ succes: true, body: asistenciaResult });
  } catch (error) {
    res.status(500).json({ error: "Error en el servidor" });
  }
};

module.exports = {
  getDetalleAsistencia,
  createDetalleAsistencia,
};
