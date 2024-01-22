const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorGetCategoria = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);

    }
];

const validatorInsertCategoria =[
    check("cat_nombre").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res,next);
    }

];
const validatorUpdateCategoria =[
    check("cat_nombre").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res,next);
    }

];

module.exports = { validatorGetCategoria, validatorInsertCategoria, validatorUpdateCategoria}