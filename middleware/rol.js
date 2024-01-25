const { handleHttpError } = require('../utils/handleError');

/**
 * Array con los roles permitidos
 * @param {*} rol 
 * @returns 
 */
const checkRol = (roles)=> (req, res, next)=>{
    try {
        const {user} = req;
        const rolesByUser = user.usu_rol;
        console.log('Rol de usuario',rolesByUser);

        const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle));
        if(!checkValueRol){
            handleHttpError(res, "USER_NOT_PERMISSIONS");
        } 
        next();
    }catch(e){
        handleHttpError(res, "ERROR_PERMISSIONS", 403);
    }
};

module.exports = {checkRol};