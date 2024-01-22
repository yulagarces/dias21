const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorGetRecordatorio= [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);

    }
];

const validatorInsertRecordatorio =[
    check("rec_fecha_i").exists().notEmpty(),
    check("rec_fecha_f").exists().notEmpty(),
    check("rec_hora").exists().notEmpty(),
    check("rec_tipo").exists().notEmpty(),
    check("pro_id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res,next);
    }

];
const validatorUpdateRecordatorio =[
    check("id").exists().notEmpty(),
    check("rec_fecha_i").exists().notEmpty(),
    check("rec_fecha_f").exists().notEmpty(),
    check("rec_hora").exists().notEmpty(),
    check("rec_tipo").exists().notEmpty(),
    check("pro_id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res,next);
    }

];

module.exports = { validatorGetRecordatorio, validatorUpdateRecordatorio, validatorInsertRecordatorio};