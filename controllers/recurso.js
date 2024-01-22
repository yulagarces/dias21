const { body, matchedData } = require('express-validator');
const {recursoModel} = require('../models'); 
const { handleHttpError } = require('../utils/handleError');
const PUBLIC_URL = process.env.PUBLIC_URL;
const express = require("express");
const Recurso = require('../models/sql/recurso');
const app = express();
app.use(express.json());

/**
 * Obtener el listado de categorias de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getRecursos= async (req, res) => {
    try{
        const data = await recursoModel.findAll({});
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR AL OBTENER CATEGORIAS", 500);
    }
    
};

/**
 * Obtrener un recurso específico
 * @param {*} req 
 * @param {*} res 
 */
const getRecurso = async (req, res) => {
    try{
        const recu_id = req.params.id;
        const data = await recursoModel.findByPk(recu_id);
        if(!data){
            return res.status(404).json({error: 'Recurso no encontrado'});
        }
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR AL OBTENER RECURSO", 500);
    }
    
};

/**
 * Obtrener un recurso por subcategoria
 * @param {*} req 
 * @param {*} res 
 */
const getRecursoSubId = async (req, res) => {
    try{
        const sub_id = req.params.id;
        const data = await Recurso.findAll(
            {where: {sub_id:sub_id}}
        );
        if(!data){
            return res.status(404).json({error: 'Recurso no encontrado'});
        }
        res.send({data});
    }
    catch(e){
        handleHttpError(res, "ERROR_GET_RECURSO_SUB", 500);
    }
    
};

/**
 * Insertar un recurso
 * @param {*} req 
 * @param {*} res 
 */
const createRecurso = async (req, res) => {
  
        try {
         const { body } = req
         const fileData = {
             recu_texto: body.recu_texto,
             recu_genero: body.recu_genero,
             recu_contenido: body.recu_contenido,
             recu_tipo: body.recu_tipo,
             recu_lenguaje: body.recu_lenguaje,
             sub_id : body.sub_id
        }
     
         const data =  await Recurso.create(fileData)
         console.log(data);
         res.send({data})
        } catch (e) {
            console.error(e);
          handleHttpError(res, "ERROR_CREATE_RECURSO", 500);
        }
      
};

/**
 * Actualizar un recurso
 * @param {*} req 
 * @param {*} res 
 */
const updateRecurso= async (req, res) => {

    try {
        const   recu_id = req.params.id;
        const data = await recursoModel.findByPk(recu_id);
        const { body } = req
   
        if (!data){
            return res.status(404).json({error: 'Recurso no encontrado'});
        }
        data.recu_texto= body.recu_texto;
        data.recu_genero= body.recu_genero,
        data.recu_contenido= body.recu_contenido,
        data.recu_tipo= body.recu_tipo,
        data.recu_lenguaje= body.recu_lenguaje,
        data.sub_id = body.sub_id 
        
        await data.save();
        console.log(data);
        res.status(200).send({data});
       } catch (e) {
           console.error(e);
         handleHttpError(res, "ERROR_UPDATE_RECURSO", 500);
       }
};
/**
 * Eliminar un recurso
 * @param {*} req 
 * @param {*} res 
 */
const deleteRecurso = async (req, res) => {
    const   recu_id = req.params.id;
    try{
        const data = await Recurso.findByPk(recu_id);
        if(!data){
            return res.status(404).json({error: 'Recurso no encontrado'});
        }
        await data.destroy();
        res.json({error: 'Recurso eliminado exitosamente'});
    }
    catch(e){
        handleHttpError(res, "ERROR_DELETE_RECURSO", 500);
    }
   

};

module.exports = {getRecurso, getRecursos, createRecurso, updateRecurso, deleteRecurso, getRecursoSubId
};