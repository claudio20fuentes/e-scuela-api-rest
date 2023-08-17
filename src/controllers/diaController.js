const DiaService = require('../services/diaService');

const getAllDia = async (req, res) => {

    try {
        const allDias = await DiaService.getAllDias();

        if (!allDias || allDias.length === 0) {
            return res.status(404).json({ error: 'No se encontraron días' });
        }

        res.status(200).json({ succes: true, data: allDias });
    
    } catch (error) {
    
        res.status(500).json({ error: 'Error en el servidor' });
    
    }

}

const getOneDia = async (req, res) => {

    const diaId = req.params.id;
    const dia = await DiaService.getOnDia(diaId); 

    try {
        if (!dia) {
            return res.status(404).json({ error: 'Dia no encontrado' });
        }

        res.status(200).json({ succes: true, data: dia });

    } catch (error) {

        res.status(500).json({ error: 'Error en el servidor' });
    
    }

}

module.exports = {
    getAllDia,
    getOneDia,
};



