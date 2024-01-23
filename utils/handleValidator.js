const { validationResult } = require("express-validator");

const validateResults = (req, res, next) => {
    try{
        validationResult(req).throw()
        return next(); //TODO Continúa hacia el controlador
    }
    catch(err){
        console.log('Error de validación', err);
        res.status(403);
        res.send({errors: err.array()});

    }
}

module.exports = validateResults;