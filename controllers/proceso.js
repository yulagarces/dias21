const {matchedData } = require('express-validator');
const {procesoModel} = require('../models'); 
const { handleHttpError } = require('../utils/handleError');
const PUBLIC_URL = process.env.PUBLIC_URL;
const express = require("express");
const { ValidationError } = require('sequelize');
const app = express();
app.use(express.json());

/**
 * Obtener el listado de procesos de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getProcesos = async (req, res) => {
    try{
        const data = await procesoModel.findAll({});
        if(!data){
            return res.status(404).json({error: 'No existen procesos'});
        }
        res.send({data});
    }
    catch(e){
        console.log(e);
        handleHttpError(res, "ERROR AL OBTENER PROCESOS", 500);
    }
    
};

/**
 * Obtrener un proceso especifica por llave primaria
 * @param {*} req 
 * @param {*} res 
 */
const getProceso = async (req, res) => {
    try{
        const pro_id = req.params.id;
        const data = await procesoModel.findByPk(pro_id);
        if(!data){
            return res.status(404).json({error: 'Proceso no encontrado'});
        }
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR AL OBTENER PROCESO", 500);
    }
    
};

/**
 * Obtrener un proceso por id de usuario
 * @param {*} req 
 * @param {*} res 
 */
const getProcesoUserId = async (req, res) => {
    try{
        const usu_dni = req.params.id;
        const data = await procesoModel.findAll(
            {where: {usu_id:usu_dni}}
        );
        if(!data){
            return res.status(404).json({error: 'Proceso no encontrado'});
        }
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR AL OBTENER PROCESO", 500);
    }
    
};

/**
 * Obtrener un proceso por id de subcategoria
 * @param {*} req 
 * @param {*} res 
 */
const getProcesoSubcategoriaId = async (req, res) => {
    try{
        const sub_id = req.params.id;
        const data = await procesoModel.findAll(
            {where: {sub_id:sub_id}}
        );
        if(!data){
            return res.status(404).json({error: 'Proceso no encontrado'});
        }
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR AL OBTENER PROCESO", 500);
    }
    
};

/**
 * Insertar un proceso
 * @param {*} req 
 * @param {*} res 
 */
const createProceso = async (req, res) => {
  
        try {
         const { body } = req
         const fileData = {
             pro_fecha_inicio: body.pro_fecha_inicio,
             pro_fecha_fin: body.pro_fecha_fin,
             pro_fecha_ui: body.pro_fecha_ui,
             pro_volumen_g: body.pro_volumen_g,
             pro_volumen_c: body.pro_volumen_c,
             pro_dia: body.pro_dia,
             pro_imagen_fondo: body.pro_imagen_fondo,
             usu_id : body.usu_id,
             sub_id : body.sub_id
        }
     
         const data =  await procesoModel.create(fileData)
         if(!data){
            return res.status(404).json({error: 'Proceso no fue creado'});
         }
         console.log(data);
         res.send({data})
        } catch (e) {
            console.error('Este es el error'+e);
            handleHttpError(res, "ERROR_CREATE_PROCESO");
        }
};

/**
 * Actualizar un proceso
 * @param {*} req 
 * @param {*} res 
 */
const updateProceso = async (req, res) => {

    try {
        const   pro_id = req.params.id;
        const data = await procesoModel.findByPk(pro_id);
        const { body } = req
   
        if (!data){
            return res.status(404).json({error: 'Proceso no encontrado'});
        }
        data.pro_fecha_inicio = body.pro_fecha_inicio;
        data.pro_fecha_fin= body.pro_fecha_fin,
        data.pro_fecha_ui= body.pro_fecha_ui,
        data.pro_volumen_g= body.pro_volumen_g,
        data.pro_volumen_c = body.pro_volumen_c,
        data.pro_dia = body.pro_dia,
        data.pro_imagen_fondo = body.pro_imagen_fondo,
        data.usu_id = body.usu_id,
        data.sub_id = body.sub_id
        
        await data.save();
        console.log(data);
        res.status(200).send({data});
       } catch (e) {
           console.error(e);
         handleHttpError(res, "ERROR_UPDATE_PROCESO", 500);
       }
};
/**
 * Eliminar un proceso
 * @param {*} req 
 * @param {*} res 
 */
const deleteProceso= async (req, res) => {
    const   pro_id = req.params.id;
    try{
        const data = await procesoModel.findByPk(pro_id);
        if(!data){
            return res.status(404).json({error: 'Proceso no encontrado'});
        }
        await data.destroy();
        res.json({error: 'Proceso eliminado exitosamente'});
    }
    catch(e){
        handleHttpError(res, "ERROR_DELETE_PROCESO", 500);
    }
   

};

module.exports = {getProceso, getProcesos, getProcesoUserId, getProcesoSubcategoriaId, 
     createProceso, updateProceso, deleteProceso};