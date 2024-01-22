const {matchedData } = require('express-validator');
const {licenciaModel} = require('../models'); 
const { handleHttpError } = require('../utils/handleError');
const PUBLIC_URL = process.env.PUBLIC_URL;
const express = require("express");
const { ValidationError } = require('sequelize');
const app = express();
app.use(express.json());

/**
 * Obtener el listado de licencias de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getLicencias = async (req, res) => {
    try{
        const data = await licenciaModel.findAll({});
        if(!data){
            return res.status(404).json({error: 'No existen licencias'});
        }
        res.send({data});
    }
    catch(e){
        console.log(e);
        handleHttpError(res, "ERROR AL OBTENER LICENCIAS", 500);
    }
    
};

/**
 * Obtrener una licencia especifica por llave primaria
 * @param {*} req 
 * @param {*} res 
 */
const getLicencia = async (req, res) => {
    try{
        const lic_id = req.params.id;
        const data = await licenciaModel.findByPk(lic_id);
        if(!data){
            return res.status(404).json({error: 'Licencia no encontrada'});
        }
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR AL OBTENER LICENCIA", 500);
    }
    
};

/**
 * Obtrener una licencia por id de usuario
 * @param {*} req 
 * @param {*} res 
 */
const getLicenciaUserId = async (req, res) => {
    try{
        const usu_dni = req.params.id;
        const data = await licenciaModel.findAll(
            {where: {usu_dni:usu_dni}}
        );
        if(!data){
            return res.status(404).json({error: 'Licencia no encontrada'});
        }
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR AL OBTENER LICENCIA", 500);
    }
    
};

/**
 * Obtrener una licencia por id de pago
 * @param {*} req 
 * @param {*} res 
 */
const getLicenciaPaymentId = async (req, res) => {
    try{
        const payment_id = req.params.id;
        const data = await licenciaModel.findAll(
            {where: {payment_id:payment_id}}
        );
        if(!data){
            return res.status(404).json({error: 'Licencia no encontrada'});
        }
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR AL OBTENER LICENCIA", 500);
    }
    
};

/**
 * Insertar una licencia
 * @param {*} req 
 * @param {*} res 
 */
const createLicencia = async (req, res) => {
  
        try {
         const { body } = req
         const fileData = {
             lic_fecha_i: body.lic_fecha_i,
             lic_fecha_f: body.lic_fecha_f,
             lic_valor: body.lic_valor,
             lic_estado_usuario: body.lic_estado_usuario,
             lic_tipo: body.lic_tipo,
             usu_dni : body.usu_dni,
             payment_id : body.payment_id
        }
     
         const data =  await licenciaModel.create(fileData)
         if(!data){
            return res.status(404).json({error: 'Licencia no fue creada'});
         }
         console.log(data);
         res.send({data})
        } catch (e) {
            console.error('Este es el error'+e);
            handleHttpError(res, "ERROR_CREATE_LICENCIA");
        }
};

/**
 * Actualizar una licencia
 * @param {*} req 
 * @param {*} res 
 */
const updateLicencia = async (req, res) => {

    try {
        const   lic_id = req.params.id;
        const data = await licenciaModel.findByPk(lic_id);
        const { body } = req
   
        if (!data){
            return res.status(404).json({error: 'Licencia no encontrada'});
        }
        data.lic_fecha_i = body.lic_fecha_i;
        data.lic_fecha_f= body.lic_fecha_f,
        data.lic_valor= body.lic_valor,
        data.lic_estado_usuario= body.lic_estado_usuario,
        data.lic_tipo = body.lic_tipo,
        data.usu_dni = body.usu_dni,
        data.payment_id = body.payment_id 
        
        await data.save();
        console.log(data);
        res.status(200).send({data});
       } catch (e) {
           console.error(e);
         handleHttpError(res, "ERROR_UPDATE_LICENCIA", 500);
       }
};
/**
 * Eliminar una licencia
 * @param {*} req 
 * @param {*} res 
 */
const deleteLicencia = async (req, res) => {
    const   lic_id = req.params.id;
    try{
        const data = await licenciaModel.findByPk(lic_id);
        if(!data){
            return res.status(404).json({error: 'Licencia no encontrada'});
        }
        await data.destroy();
        res.json({error: 'Licencia eliminada exitosamente'});
    }
    catch(e){
        handleHttpError(res, "ERROR_DELETE_LICENCIA", 500);
    }
   

};

module.exports = {getLicencia, getLicencias, getLicenciaUserId, getLicenciaPaymentId, 
     createLicencia, updateLicencia, deleteLicencia};