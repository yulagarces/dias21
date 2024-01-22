const {userModel} = require('../models'); 
const PUBLIC_URL = process.env.PUBLIC_URL;

/**
 * Obtener el listado de usuarios de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getUsers = async (req, res) => {
    console.log("Llega hasta Controllers user");
    const data = await userModel.findAll({});
    res.send({data});
};

/**
 * Obtrener un usuario específico
 * @param {*} req 
 * @param {*} res 
 */
const getUser = (req, res) => {};

/**
 * Insertar un usuario
 * @param {*} req 
 * @param {*} res 
 */
const createUser = async (req, res) => {
    const { body,file } = req
    console.log(file);
    const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`
    }
    const data =  await userModel.create(fileData)
    res.send({file})
};

/**
 * Actualizar un usuario
 * @param {*} req 
 * @param {*} res 
 */
const updateUser = (req, res) => {};

/**
 * Eliminar un usuario
 * @param {*} req 
 * @param {*} res 
 */
const deleteUser = (req, res) => {};

module.exports = {getUser, getUsers, createUser, updateUser, deleteUser};