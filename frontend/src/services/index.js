const profesores = require('./profesoresServices');
const asignatura = require('./asignaturasServices');
const cursos = require('./cursosServices');
const roles = require('./rolesServices');
const bloques = require('./bloquesServices');
const asistencia = require('./asistenciaServices');


export default {
    profesores,
    asignatura,
    cursos,
    roles,
    bloques,
    asistencia
}