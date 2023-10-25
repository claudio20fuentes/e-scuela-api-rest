const matriculaService = require("../services/matriculaService");


const getAllMatriculas = async (req,res) => {
    try {
        const matriculas = await matriculaService.getAllMatriculas(req);
        if (!matriculas) {
            return res.status(404).json({error: "Matriculas no encontradas" })
        }
        res.status(200).json({ succes: true, body: matriculas })
    } catch (error) {

        console.error("Error al traer matriculas", error);
        
    }
}

module.exports = {
    getAllMatriculas
}