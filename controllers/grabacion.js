const {matchedData } = require('express-validator');
const {grabacionModel} = require('../models'); 
const { handleHttpError } = require('../utils/handleError');
const PUBLIC_URL = process.env.PUBLIC_URL;
const express = require("express");
const { ValidationError } = require('sequelize');
const app = express();
app.use(express.json());

/**
 * Obtener el listado de grabaciones
 * @param {*} req 
 * @param {*} res 
 */
const getGrabaciones = async (req, res) => {
    try{
        const data = await grabacionModel.findAll({});
        if(!data){
            return res.status(404).json({error: 'No existen grabaciones'});
        }
        res.send({data});
    }
    catch(e){
        console.log(e);
        handleHttpError(res, "ERROR AL OBTENER GRABACIONES", 500);
    }
    
};

/**
 * Obtrener una grabació especifica por id
 * @param {*} req 
 * @param {*} res 
 */
const getGrabacion = async (req, res) => {
    try{
        const gra_id = req.params.id;
        const data = await grabacionModel.findByPk(gra_id);
        if(!data){
            return res.status(404).json({error: 'Grabación no encontrada'});
        }
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR AL OBTENER GRABACION", 500);
    }
    
};

/**
 * Obtrener una grabació por código de proceso
 * @param {*} req 
 * @param {*} res 
 */
const getGrabacionProId = async (req, res) => {
    try{
        const pro_id = req.params.id;
        const data = await grabacionModel.findAll(
            {where: {pro_id:pro_id}}
        );
        if(!data){
            return res.status(404).json({error: 'Grabación no encontrada'});
        }
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR AL OBTENER GRABACION", 500);
    }
    
};

/**
 * Insertar una grabación
 * @param {*} req 
 * @param {*} res 
 */
const createGrabacion = async (req, res) => {
  
        try {
         const { body } = req
         const fileData = {
             gra_audio: body.gra_audio,
             gra_fecha: body.gra_fecha,
             pro_id: body.pro_id
            
        }
     
         const data =  await grabacionModel.create(fileData)
         if(!data){
            return res.status(404).json({error: 'Grabación no fue creada'});
         }
         console.log(data);
         res.send({data})
        } catch (e) {
            console.error('Este es el error'+e);
            handleHttpError(res, "ERROR_CREATE_GRABACION");
        }
};

/**
 * Actualizar una grabación
 * @param {*} req 
 * @param {*} res 
 */
const updateGrabacion = async (req, res) => {

    try {
        const   gra_id = req.params.id;
        const data = await grabacionModel.findByPk(gra_id);
        const { body } = req
   
        if (!data){
            return res.status(404).json({error: 'Grabación no encontrada'});
        }
        data.gra_audio = body.gra_audio;
        data.gra_fecha= body.gra_fecha,
        data.pro_id= body.pro_id
        
        await data.save();
        console.log(data);
        res.status(200).send({data});
       } catch (e) {
           console.error(e);
         handleHttpError(res, "ERROR_UPDATE_GRABACION", 500);
       }
};
/**
 * Eliminar una grabación
 * @param {*} req 
 * @param {*} res 
 */
const deleteGrabacion = async (req, res) => {
    const   gra_id = req.params.id;
    try{
        const data = await grabacionModel.findByPk(gra_id);
        if(!data){
            return res.status(404).json({error: 'Grabación no encontrada'});
        }
        await data.destroy();
        res.json({error: 'Grabación eliminada exitosamente'});
    }
    catch(e){
        handleHttpError(res, "ERROR_DELETE_GRABACION", 500);
    }
   

};

module.exports = {getGrabacion, getGrabaciones, getGrabacionProId, updateGrabacion, createGrabacion, deleteGrabacion};