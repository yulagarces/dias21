const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorGetProceso = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);

    }
];

const validatorInsertProceso =[
    check("pro_fecha_inicio").exists().notEmpty(),
    check("pro_fecha_fin").exists().notEmpty(),
    check("sub_id").exists().notEmpty(),
    check("usu_id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res,next);
    }

];
const validatorUpdateProceso=[
    check("pro_fecha_inicio").exists().notEmpty(),
    check("pro_fecha_fin").exists().notEmpty(),
    check("pro_fecha_ui").exists().notEmpty(),
    check("pro_volumen_g").exists().notEmpty(),
    check("pro_volumen_c").exists().notEmpty(),
    check("pro_dia").exists().notEmpty(),
    check("pro_imagen_fondo").exists().notEmpty(),
    check("sub_id").exists().notEmpty(),
    check("usu_id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res,next);
    }

];

module.exports = { validatorGetProceso, validatorInsertProceso, validatorUpdateProceso}