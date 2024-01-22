const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorGetLicencia = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);

    }
];

const validatorInsertLicencia =[
    check("lic_fecha_i").exists().notEmpty(),
    check("lic_fecha_f").exists().notEmpty(),
    check("lic_valor").exists().notEmpty(),
    check("lic_estado_usuario").exists().notEmpty(),
    check("lic_tipo").exists().notEmpty(),
    check("usu_dni").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res,next);
    }

];
const validatorUpdateLicencia =[
    check("lic_fecha_i").exists().notEmpty(),
    check("lic_fecha_f").exists().notEmpty(),
    check("lic_valor").exists().notEmpty(),
    check("lic_estado_usuario").exists().notEmpty(),
    check("lic_tipo").exists().notEmpty(),
    check("usu_dni").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res,next);
    }

];

module.exports = { validatorGetLicencia, validatorInsertLicencia, validatorUpdateLicencia}