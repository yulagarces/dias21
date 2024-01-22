const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorRegister = [
    check("usu_documento").exists().notEmpty().isLength({min:5, max:12}),
    check("usu_correo").exists().notEmpty().isEmail(),
    check("usu_genero").exists().notEmpty(),
    check("usu_contrasenia").isLength({min:5,max:15}).notEmpty(),
    check("usu_edad").exists().notEmpty().isNumeric(),
    check("usu_nombre").exists().notEmpty().isLength({min:3, max:99}),
    (req, res, next) => {
        return validateResults(req, res, next);

    }
];

const validatorLogin = [
    check("usu_correo").exists().notEmpty().isEmail(),
    check("usu_contrasenia").isLength({min:5,max:15}).notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);

    }
];



module.exports = { validatorRegister, validatorLogin}