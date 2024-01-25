const {handleHttpError} = require("../utils/handleError");
const {verifyToken} = require("../utils/handleJwt");
const {userModel} = require("../models");

const authMiddleware = async(req, res, next) => {
    try{
        if(!req.headers.authorization){
            handleHttpError(res, "NOT_TOKEN", 401);
            return;
        }
        const token = req.headers.authorization.split(' ').pop();
        const dataToken = await verifyToken(token);
     
        if(!dataToken._id){
            handleHttpError(res, "ERROR_ID_TOKEN", 401);
            return;
        }
        console.log('Usuario con token', dataToken._id);
        const user = await userModel.findByPk(dataToken._id);
        console.log('Usuario con token', user);
        req.user = user;
        next();
    }
    catch(e){
        console.log('Este es el error',e);
        handleHttpError(res, "NOT_SESSION", 401);
    }
}; 

module.exports = {authMiddleware};