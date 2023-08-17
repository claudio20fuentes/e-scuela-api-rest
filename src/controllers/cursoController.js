const cursoService = require('../services/cursoService');

const getAllCursos = async (req, res) => {

    try {

        const allCursos = await cursoService.getAllCursos();

        if (!allCursos || allCursos.lenth === 0) {
            return res.status(404).json({ error: 'No se encontraron cursos' });
        }

        res.status(200).json({ succes: true, data: allCursos });;

    } catch (error) {

        res.status(500).json({ error: 'Error en el servidor' });

    }

};

const getOnCurso = async (req, res) => {

    const cursoId = req.params.id;
    const curso = await cursoService.getOnCurso(cursoId);

    try {

        if (!curso) {
            return res.status(404).json({ error: 'Curso no encontrado' });

        }
        res.status(200).json({ succes: true, data: curso });



    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });

    }

};

const createCurso = async (req, res) => {
    const dataCurso = req.body;

    try {
        const curso = await cursoService.createCurso(dataCurso);
        res.status(201).json({ succes: true, data: curso });

    } catch (error) {

        console.error('Error al crear el curso:', error);
        res.status(500).json({ error: 'Error en el servidor' });
    }

};

const updateCurso = async (req, res) => {
    const cursoId = req.params.id;
    const data = req.body;
    try {
        const update = await cursoService.updateCurso(cursoId, data);
        if (update) {
            res.status(200).json({ succes: true, message: 'Curso actualizado correctamente' })

        } else {
            res.status(404).json({ error: 'Curso no encontrado' });

        }
    } catch (error) {
        console.error(`Error al editar el curso con ID ${cursoId}:`, error);
        res.status(500).json({ error: 'Error en el servidor' });
    }

};

const deleteCurso = async (req, res) => {

    const id = req.params.id;


    try {
        const curso = await cursoService.deleteCurso(id);
        if (!curso) {
            return res.status(404).json({ error: 'Curso no encontrado' });

        }
        res.status(200).json({ succes: true, data: 'Curso eliminado correctamente' });

    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor' });

    }

};

module.exports = {
    getAllCursos,
    getOnCurso,
    createCurso,
    updateCurso,
    deleteCurso
};