const {matchedData } = require('express-validator');
const {recordatorioModel} = require('../models'); 
const { handleHttpError } = require('../utils/handleError');
const PUBLIC_URL = process.env.PUBLIC_URL;
const express = require("express");
const { ValidationError } = require('sequelize');
const app = express();
app.use(express.json());

/**
 * Obtener el listado de recordatorios de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getRecordatorios = async (req, res) => {
    try{
        const data = await recordatorioModel.findAll({});
        if(!data){
            return res.status(404).json({error: 'No existen recordatorios'});
        }
        res.send({data});
    }
    catch(e){
        console.log(e);
        handleHttpError(res, "ERROR AL OBTENER RECORDATORIOS", 500);
    }
    
};

/**
 * Obtrener un recordatorio especifico por id
 * @param {*} req 
 * @param {*} res 
 */
const getRecordatorio = async (req, res) => {
    try{
        const rec_id = req.params.id;
        const data = await recordatorioModel.findByPk(rec_id);
        if(!data){
            return res.status(404).json({error: 'Recordatorio no encontrado'});
        }
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR AL OBTENER RECORDATORIO", 500);
    }
    
};

/**
 * Obtrener un recordatorio por proceso
 * @param {*} req 
 * @param {*} res 
 */
const getRecordatorioProId = async (req, res) => {
    try{
        const pro_id = req.params.id;
        const data = await recordatorioModel.findAll(
            {where: {pro_id:pro_id}}
        );
        if(!data){
            return res.status(404).json({error: 'Recordatorio no encontrado'});
        }
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR AL OBTENER RECORDATORIO", 500);
    }
    
};

/**
 * Insertar un recordatorio
 * @param {*} req 
 * @param {*} res 
 */
const createRecordatorio = async (req, res) => {
  
        try {
         const { body } = req
         const fileData = {
             rec_fecha_i: body.rec_fecha_i,
             rec_fecha_f: body.rec_fecha_f,
             rec_hora: body.rec_hora,
             rec_tipo: body.rec_tipo,
             pro_id : body.pro_id
        }
     
         const data =  await recordatorioModel.create(fileData)
         if(!data){
            return res.status(404).json({error: 'Recordatorio no fue creado'});
         }
         console.log(data);
         res.send({data})
        } catch (e) {
            console.error('Este es el error'+e);
            handleHttpError(res, "ERROR_CREATE_RECORDATORIO");
        }
};

/**
 * Actualizar un recordatorio
 * @param {*} req 
 * @param {*} res 
 */
const updateRecordatorio = async (req, res) => {

    try {
        const   rec_id = req.params.id;
        const data = await recordatorioModel.findByPk(rec_id);
        const { body } = req
   
        if (!data){
            return res.status(404).json({error: 'Recordatorio no encontrado'});
        }
        data.rec_fecha_i = body.rec_fecha_i;
        data.rec_fecha_f= body.rec_fecha_f,
        data.rec_hora= body.rec_hora,
        data.rec_tipo= body.rec_tipo,
        data.pro_id = body.pro_id 
        
        await data.save();
        console.log(data);
        res.status(200).send({data});
       } catch (e) {
           console.error(e);
         handleHttpError(res, "ERROR_UPDATE_RECORDATORIO", 500);
       }
};
/**
 * Eliminar un recordatorio
 * @param {*} req 
 * @param {*} res 
 */
const deleteRecordatorio = async (req, res) => {
    const   rec_id = req.params.id;
    try{
        const data = await recordatorioModel.findByPk(rec_id);
        if(!data){
            return res.status(404).json({error: 'Recordatorio no encontrado'});
        }
        await data.destroy();
        res.json({error: 'Recordatorio eliminado exitosamente'});
    }
    catch(e){
        handleHttpError(res, "ERROR_DELETE_RECORDATORIO", 500);
    }
   

};

module.exports = {getRecordatorio, getRecordatorios, getRecordatorioProId, createRecordatorio, updateRecordatorio, deleteRecordatorio};