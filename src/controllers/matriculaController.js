const matriculaService = require("../services/matriculaService");

const getAllMatriculas = async (req, res) => {
  try {
    const matriculas = await matriculaService.getAllMatriculas(req);
    if (!matriculas) {
      return res.status(404).json({ error: "Matriculas no encontradas" });
    }
    res.status(200).json({ succes: true, body: matriculas });
  } catch (error) {
    console.error("Error al traer matriculas", error);
  }
};
const getMatriculaById = async (req, res) => {
  try {
    const { school: idEscuela } = req.user;
    const { id } = req.params;

    const matriculas = await matriculaService.getMatriculaById(id);
    if (!matriculas) {
      return res.status(404).json({ error: "Matriculas no encontradas" });
    }
    res.status(200).json({ succes: true, body: matriculas });
  } catch (error) {
    console.error("Error al traer matriculas", error);
  }
};

const createMatricula = async (req, res) => {
  try {
    // For Estudiante
    let queryEstudiante = {};
    const { school: idEscuela } = req.user;
    const { nombre, apellidos, rut } = req.body;
    queryEstudiante = { nombre, apellidos, rut, idEscuela };
    const estudiante = await matriculaService.createEstudiante(queryEstudiante);
    if (!estudiante) {
      return res.status(404).json({ error: "Estudiante no creado" });
    }
    const idEstudiante = estudiante.id;
    // For Matricula
    const { idCurso } = req.body;
    const queryMatricula = { idCurso, idEstudiante };
    const matricula = await matriculaService.createMatricula(queryMatricula);
    if (!matricula) {
      return res.status(404).json({ error: "Matricula no creada" });
    }
    res.status(200).json({ succes: true, body: matricula });
  } catch (error) {
    console.error("Error al crear matricula", error);
  }
};

const updateMatricula = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellidos, rut } = req.body;
    // TODO: search first then update
    const matricula = await matriculaService.getMatriculaById(id);
    if (!matricula) {
      return res.status(404).json({ error: "Matricula no encontrada" });
    }

    const { idCurso, idEstudiante } = matricula;
    const queryEstudiante = { idCurso, idEstudiante, nombre, apellidos, rut };
    // TODO: check ??
    const estudianteResult = await estudianteService.updateEstudiante(queryEstudiante);
    if (!estudianteResult) {
      return res.status(404).json({ error: "Estudiante no actualizado" });
    }
    // TODO: update estudiante first then matricula
    const result = await matriculaService.updateMatricula({ idCurso, idEstudiante });
    if (!result) {
      return res.status(404).json({ error: "Matricula no actualizada" });
    }
    res.status(200).json({ succes: true, body: result });
  } catch (error) {
    console.error("Error al actualizar matricula", error);
  }
};

module.exports = {
  getAllMatriculas,
  getMatriculaById,
  createMatricula,
  updateMatricula,
};
