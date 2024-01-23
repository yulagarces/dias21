const jwt = require("jsonwebtoken");
const User = require("../models/sql/user");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Pasar el objeto del usuario
 * @param {*} user 
 */
const tokenSign = async (user) =>{
    const sign = await jwt.sign(
        {
        _id: user.usu_dni,
        role: user.usu_rol
        },
        JWT_SECRET,
        {
            expiresIn: "2h",
        }
        
);
console.log('Esta es la firma',sign);
return sign;

};
/**
 * Pasar el token de la sesión JWT
 * @param {*} tokenJwt 
 */
const verifyToken = async(tokenJwt) => {
    try{
        return jwt.verifyToken(tokenJwt, JWT_SECRET);
    }
    catch(e){
        return null;
    }
};

module.exports = {tokenSign, verifyToken};