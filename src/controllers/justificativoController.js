const getAllJustificativo = (req, res) => {
    res.send("Get all justificativos");
}

const getOneJustificativo = (req, res) => {
    res.send(`get justificativo ${req.params.justificativoId}`);
}

const createNewJustificativo  = (req, res) => {
    res.send(`create justificativo ${req.params.justificativoId}`);
}

const updateOneJustificativo  = (req, res) => {
    res.send(`update justificativo ${req.params.justificativoId}`);
}

const deleteOnJustificativo  = (req, res) => {
    res.send(`delete justificativo ${req.params.justificativoId}`);
}

module.exports = {
    getAllJustificativo,
    getOneJustificativo,
    createNewJustificativo,
    updateOneJustificativo,
    deleteOnJustificativo
};