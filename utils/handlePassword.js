const bcrypt = require("bcryptjs");

/**
 * Constraseña sin encriptar
 * @param {*} passwordPlain 
 */
const encypt = async(passwordPlain) =>{
   try{
    const hash = await bcrypt.hash(passwordPlain, 10);
    return hash;
   }
   catch(e){
    console.log(e);
    throw e;
   }
};
/**
 * Pasar contraseña sin encriptar y encriptada
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */
const compare = async(passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword);
};

module.exports = {encypt, compare};