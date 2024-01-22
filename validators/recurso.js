const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorGetRecurso = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);

    }
];

const validatorInsertRecurso =[
    check("recu_texto").exists().notEmpty(),
    check("recu_genero").exists().notEmpty(),
    check("recu_contenido").exists().notEmpty(),
    check("recu_tipo").exists().notEmpty(),
    check("recu_lenguaje").exists().notEmpty(),
    check("sub_id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res,next);
    }

];
const validatorUpdateRecurso =[
    check("recu_texto").exists().notEmpty(),
    check("recu_genero").exists().notEmpty(),
    check("recu_contenido").exists().notEmpty(),
    check("recu_tipo").exists().notEmpty(),
    check("recu_lenguaje").exists().notEmpty(),
    check("sub_id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res,next);
    }

];

module.exports = { validatorGetRecurso, validatorInsertRecurso, validatorUpdateRecurso}