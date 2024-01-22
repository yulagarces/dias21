const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorGetSubcategoria = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);

    }
];

const validatorInsertSubcategoria =[
    check("sub_nombre").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res,next);
    }

];
const validatorUpdateSubcategoria =[
    check("sub_nombre").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res,next);
    }

];

module.exports = { validatorGetSubcategoria, validatorInsertSubcategoria, validatorUpdateSubcategoria}