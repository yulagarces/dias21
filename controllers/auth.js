const {userModel} = require('../models'); 
const { handleHttpError } = require('../utils/handleError');
const {encypt, compare} = require('../utils/handlePassword');
const PUBLIC_URL = process.env.PUBLIC_URL;

/**
 * Obtener el listado de usuario de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getUsers = async (req, res) => {
    try{
        const data = await userModel.findAll({});
        console.log('Esto es una prueba de sincronización');
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR AL OBTENER USUARIOS", 500);
    }
    
};

/**
 * Obtrener un usuario específico por llave primaria
 * @param {*} req 
 * @param {*} res 
 */
const getUser = async (req, res) => {
    try{
        const usu_dni = req.params.id;
        const data = await userModel.findByPk(usu_dni);
        if(!data){
            return res.status(404).json({error: 'Usuario no encontrado'});
        }
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR AL OBTENER USUARIO", 500);
    }
};
/**
 * Obtrener un usuario específico por documento
 * @param {*} req 
 * @param {*} res 
 */
const getUserDocumento = async (req, res) => {
    try{
        const usu_docu = req.params.id;
        const data = await userModel.findAll(
            {where: {usu_documento:usu_docu}}
        );
        if(!data){
            return res.status(404).json({error: 'Usuario no encontrado'});
        }
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR AL OBTENER USUARIO", 500);
    }
};

/**
 * Insertar un usuario
 * @param {*} req 
 * @param {*} res 
 */
const createUser = async (req, res) => {
   try{
    const { body,file } = req
     
  
    //const body2 = {...req, usu_contrasenia };

    const fileData = {
        usu_dni: body.usu_dni,
        usu_documento: Math.floor(body.usu_documento),
        usu_correo: body.usu_correo,
        usu_genero: body.usu_genero,
        usu_contrasenia: await encypt(body.usu_contrasenia),
        filename: file.filename,
        usu_edad:Math.floor(body.usu_edad),
        usu_foto: `${PUBLIC_URL}/${file.filename}`,
        usu_nombre: body.usu_nombre
    }

    const data =  await userModel.create(fileData)
    data.set("usu_contrasenia", undefined, {strict:false});
    res.send({data})}
    catch(e){
        console.error(e);
        handleHttpError(res, "ERROR_CREATE_USUARIO", 500);
    }

};

/**
 * Actualizar un usuario
 * @param {*} req 
 * @param {*} res 
 */
const updateUser = async (req, res) => {
    try {
        const usu_docu = req.params.id;
        const data = await userModel.findOne(
            {where: {usu_documento:usu_docu}}
        );
     
        if(!data){
           return res.status(404).json({error: 'Usuario no fue encontrado'});
        }
        
        const { body,file} = req;
        console.log(data);
        
       
        data.usu_correo= body.usu_correo,
        data.usu_genero= body.usu_genero,
        data.usu_contrasenia= body.usu_contrasenia,
        data.usu_foto = `${PUBLIC_URL}/${file.filename}`,
        data.usu_edad = body.usu_edad,
        data.usu_nombre = body.usu_nombre

        await data.save();
        console.log(data);
        res.status(200).send({data});
        
    } catch (e) {
           console.error('Este es el error'+e);
           handleHttpError(res, "ERROR_ACTUALIZAR_USUARIO");
       }
};

/**
 * Eliminar un usuario por documento
 * @param {*} req 
 * @param {*} res 
 */
const deleteUser = async (req, res) => {
   
    try{
        const   usu_docu = req.params.id;
        const data = await userModel.findOne(
            {where: {usu_documento:usu_docu}}
        );
        if(!data){
            return res.status(404).json({error: 'Usuario no encontrado'});
        }
        await data.destroy();
        res.json({error: 'Usuario eliminado exitosamente'});
    }
    catch(e){
        console.log(e);
        handleHttpError(res, "ERROR_DELETE_USUARIO", 500);
    }
};

module.exports = {getUser, getUsers, getUserDocumento, createUser, updateUser, deleteUser};