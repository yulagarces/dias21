const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateUser = [
    check("usu_documento").
    exists().
    notEmpty().
    isLength({min:5, max:12}),
    check("usu_correo").
    exists().
    notEmpty().isEmail(),
    (req, res, next) => {
        return validateResults(req, res, next);

    }
];

const validatorUpdateUser = [
    check("usu_correo").
    exists().
    notEmpty().isEmail(),
    (req, res, next) => {
        return validateResults(req, res, next);

    }
];

const validatorGetUsuario = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);

    }
];

const validatorGetUsuarioDocumento = [
    check("id").exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);

    }
];

module.exports = { validatorCreateUser, validatorGetUsuario, validatorGetUsuarioDocumento, validatorUpdateUser}