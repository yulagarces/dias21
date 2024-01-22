const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorGetGrabacion = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);

    }
];

const validatorInsertGrabacion =[
    check("gra_audio").exists().notEmpty(),
    check("gra_fecha").exists().notEmpty(),
    check("pro_id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res,next);
    }

];
const validatorUpdateGrabacion =[
    check("id").exists().notEmpty(),
    check("gra_audio").exists().notEmpty(),
    check("gra_fecha").exists().notEmpty(),
    check("pro_id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res,next);
    }

];

module.exports = { validatorGetGrabacion, validatorInsertGrabacion, validatorUpdateGrabacion}